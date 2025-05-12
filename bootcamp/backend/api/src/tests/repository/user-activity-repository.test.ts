import { describe, it, expect, jest } from "@jest/globals";
import * as repository from "../../repository/user-activity-repository";

// Mock completo do módulo prisma
jest.mock("../../prisma/prisma-client", () => {
  return {
    __esModule: true,
    default: {
      userActivity: {
        createMany: jest.fn(),
        findMany: jest.fn()
      }
    }
  };
});

// Referência ao prisma mockado
const prisma = require("../../prisma/prisma-client").default;

describe("User Activity Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createRelations", () => {
    it("Deve criar relações entre usuários e atividades", async () => {
      const input = [
        { userId: "user1", activityId: "activity1" },
        { userId: "user2", activityId: "activity1" }
      ];
      
      const mockResult = { count: 2 };
      
      prisma.userActivity.createMany.mockResolvedValue(mockResult);
      
      const result = await repository.createRelations(input);
      
      expect(prisma.userActivity.createMany).toHaveBeenCalledWith({
        data: input
      });
      
      expect(result).toEqual(mockResult);
    });
  });

  describe("getActivitiesByUserId", () => {
    it("Deve retornar atividades de um usuário", async () => {
      const userId = "user1";
      
      const mockActivities = [
        {
          activity: { id: "activity1", title: "Atividade 1", description: "Descrição 1" }
        },
        {
          activity: { id: "activity2", title: "Atividade 2", description: "Descrição 2" }
        }
      ];
      
      prisma.userActivity.findMany.mockResolvedValue(mockActivities);
      
      const result = await repository.getActivitiesByUserId(userId);
      
      expect(prisma.userActivity.findMany).toHaveBeenCalledWith({
        where: { userId },
        include: { activity: true },
        omit: { activityId: true, userId: true }
      });
      
      expect(result).toEqual(mockActivities);
    });
  });
});