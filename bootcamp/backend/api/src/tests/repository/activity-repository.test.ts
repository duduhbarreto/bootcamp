import { describe, it, expect, jest } from "@jest/globals";
import * as repository from "../../repository/activity-repository";

// Mock completo do módulo prisma
jest.mock("../../prisma/prisma-client", () => {
  return {
    __esModule: true,
    default: {
      activity: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn()
      }
    }
  };
});

// Referências ao prisma mockado
const prisma = require("../../prisma/prisma-client").default;

describe("Activity Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("Deve retornar todas as atividades", async () => {
      // Mock de dados simples
      const mockData = [
        { id: "1", title: "Atividade 1", description: "Descrição 1" },
        { id: "2", title: "Atividade 2", description: "Descrição 2" }
      ];
      
      // Configurar o mock
      prisma.activity.findMany.mockResolvedValue(mockData);
      
      // Chamar a função
      const result = await repository.getAll();
      
      // Verificar se foi chamado
      expect(prisma.activity.findMany).toHaveBeenCalled();
      
      // Verificar o resultado
      expect(result).toEqual(mockData);
    });
  });

  describe("getById", () => {
    it("Deve retornar uma atividade por ID", async () => {
      const mockData = { id: "1", title: "Atividade 1", description: "Descrição 1" };
      
      prisma.activity.findUnique.mockResolvedValue(mockData);
      
      const result = await repository.getById("1");
      
      expect(prisma.activity.findUnique).toHaveBeenCalledWith({
        where: { id: "1" }
      });
      
      expect(result).toEqual(mockData);
    });
  });

  describe("create", () => {
    it("Deve criar uma nova atividade", async () => {
      const input = { title: "Nova Atividade", description: "Nova Descrição" };
      const mockData = { id: "3", ...input };
      
      prisma.activity.create.mockResolvedValue(mockData);
      
      const result = await repository.create(input);
      
      expect(prisma.activity.create).toHaveBeenCalledWith({
        data: input
      });
      
      expect(result).toEqual(mockData);
    });
  });
});