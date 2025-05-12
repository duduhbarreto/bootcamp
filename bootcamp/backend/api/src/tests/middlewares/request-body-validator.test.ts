import { describe, expect, test, jest } from "@jest/globals";
import validateRequestBody from "../../middlewares/request-body-validator";
import { z } from "zod";

describe("Request Body Validator Middleware", () => {
  test("Should call next if validation passes", () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email()
    });
    
    const req = {
      body: {
        name: "Test User",
        email: "test@example.com"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    const middleware = validateRequestBody(schema);
    middleware(req as any, res as any, next);
    
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
  
  test("Should return 400 if validation fails", () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email()
    });
    
    const req = {
      body: {
        name: "Test User",
        email: "invalid-email"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();
    
    const middleware = validateRequestBody(schema);
    middleware(req as any, res as any, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Informe os campos obrigatórios corretamente.");
  });
});