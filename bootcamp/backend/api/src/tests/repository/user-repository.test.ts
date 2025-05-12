import { describe, it, expect, jest } from "@jest/globals";
import * as repository from "../../repository/user-repository";

// Mock completo do módulo prisma
jest.mock("../../prisma/prisma-client", () => {
  return {
    __esModule: true,
    default: {
      user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    }
  };
});

// Referência ao prisma mockado
const prisma = require("../../prisma/prisma-client").default;

describe("User Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("Deve retornar todos os usuários com filtro e ordenação", async () => {
      const mockUsers = [
        { id: "1", name: "João", email: "joao@example.com", password: "hash1" },
        { id: "2", name: "Maria", email: "maria@example.com", password: "hash2" }
      ];
      
      prisma.user.findMany.mockResolvedValue(mockUsers);
      
      const result = await repository.getAll("name", "Jo", "email", "asc");
      
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          name: { contains: "Jo", mode: "insensitive" }
        },
        orderBy: {
          email: "asc"
        }
      });
      
      expect(result).toEqual(mockUsers);
    });

    it("Deve retornar todos os usuários sem filtro", async () => {
      const mockUsers = [
        { id: "1", name: "João", email: "joao@example.com", password: "hash1" },
        { id: "2", name: "Maria", email: "maria@example.com", password: "hash2" }
      ];
      
      prisma.user.findMany.mockResolvedValue(mockUsers);
      
      const result = await repository.getAll(undefined, undefined, "email", "desc");
      
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: undefined,
        orderBy: {
          email: "desc"
        }
      });
      
      expect(result).toEqual(mockUsers);
    });
  });

  describe("getPaginated", () => {
    it("Deve retornar usuários paginados", async () => {
      const mockUsers = [
        { id: "1", name: "João", email: "joao@example.com", password: "hash1" }
      ];
      
      prisma.user.findMany.mockResolvedValue(mockUsers);
      
      const result = await repository.getPaginated(10, 0);
      
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        take: 10,
        skip: 0
      });
      
      expect(result).toEqual(mockUsers);
    });
  });

  describe("getById", () => {
    it("Deve retornar um usuário pelo ID", async () => {
      const mockUser = { id: "1", name: "João", email: "joao@example.com", password: "hash1" };
      
      prisma.user.findUnique.mockResolvedValue(mockUser);
      
      const result = await repository.getById("1");
      
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: "1"
        }
      });
      
      expect(result).toEqual(mockUser);
    });
  });

  describe("getByEmail", () => {
    it("Deve retornar um usuário pelo email", async () => {
      const mockUser = { id: "1", name: "João", email: "joao@example.com", password: "hash1" };
      
      prisma.user.findUnique.mockResolvedValue(mockUser);
      
      const result = await repository.getByEmail("joao@example.com");
      
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: "joao@example.com"
        }
      });
      
      expect(result).toEqual(mockUser);
    });
  });

  describe("create", () => {
    it("Deve criar um novo usuário", async () => {
      const userData = {
        name: "Novo Usuário",
        email: "novo@example.com",
        password: "senha123"
      };
      
      const mockCreatedUser = { id: "3", ...userData };
      
      prisma.user.create.mockResolvedValue(mockCreatedUser);
      
      const result = await repository.create(userData);
      
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userData
      });
      
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe("update", () => {
    it("Deve atualizar um usuário existente", async () => {
      const userData = {
        name: "João Atualizado",
        email: "joao.atualizado@example.com",
        password: "novasenha"
      };
      
      const mockUpdatedUser = { id: "1", ...userData };
      
      prisma.user.update.mockResolvedValue(mockUpdatedUser);
      
      const result = await repository.update(userData, "1");
      
      expect(prisma.user.update).toHaveBeenCalledWith({
        data: userData,
        where: {
          id: "1"
        }
      });
      
      expect(result).toEqual(mockUpdatedUser);
    });
  });

  describe("remove", () => {
    it("Deve remover um usuário pelo ID", async () => {
      const mockDeletedUser = { id: "1", name: "João", email: "joao@example.com", password: "hash1" };
      
      prisma.user.delete.mockResolvedValue(mockDeletedUser);
      
      const result = await repository.remove("1");
      
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: {
          id: "1"
        }
      });
      
      expect(result).toEqual(mockDeletedUser);
    });
  });
});