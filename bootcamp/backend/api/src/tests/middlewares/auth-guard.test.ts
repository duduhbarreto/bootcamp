import { describe, expect, test, jest } from "@jest/globals";
import authGuard from "../../middlewares/auth-guard";
import jwt from "jsonwebtoken";
import { Express } from "express";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn()
}));

describe("Auth Guard Middleware", () => {
  test("Should return 401 if no authorization header", () => {
    const req = {
      headers: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    authGuard(req as any, res as any, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith(
      "Você precisa estar autenticado para acessar este endpoint."
    );
    expect(next).not.toHaveBeenCalled();
  });
  
  test("Should return 401 if token is invalid", () => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });
    
    authGuard(req as any, res as any, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Token inválido ou expirado.");
    expect(next).not.toHaveBeenCalled();
  });
  
  test("Should set userId and call next if token is valid", () => {
    const req: any = {
      headers: {
        authorization: "Bearer validtoken"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    const mockUser = {
      id: "user1",
      name: "User 1",
      email: "user1@example.com",
      password: "hash",
      iat: 1234567890,
      exp: 1234567890
    };
    
    (jwt.verify as jest.Mock).mockReturnValue(mockUser);
    
    authGuard(req, res as any, next);
    
    expect(req.userId).toBe("user1");
    expect(next).toHaveBeenCalled();
  });
});