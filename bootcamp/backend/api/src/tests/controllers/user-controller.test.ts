import { describe, expect, test, jest } from "@jest/globals";
import request from "supertest";
import express, { json } from "express";
import userController from "../../controllers/user-controller";

// Mock dos repositórios e serviços
jest.mock("../../repository/user-repository", () => ({
  getAll: jest.fn(() => [
    { id: "1", name: "User 1", email: "user1@example.com" },
    { id: "2", name: "User 2", email: "user2@example.com" }
  ]),
  getPaginated: jest.fn(() => [
    { id: "1", name: "User 1", email: "user1@example.com" }
  ]),
  getById: jest.fn((id) => 
    id === "1" ? { id: "1", name: "User 1", email: "user1@example.com" } : null
  ),
  update: jest.fn((data, id) => ({ ...(typeof data === "object" && data !== null ? data : {}), id })),
  remove: jest.fn((id) => ({ id, name: "User 1", email: "user1@example.com" }))
}));

jest.mock("../../services/user-service", () => ({
  createUser: jest.fn(() => ({ 
    id: "1", 
    name: "New User", 
    email: "newuser@example.com", 
    password: "hashedpassword" 
  }))
}));

jest.mock("../../services/s3-service", () => ({
  uploadImage: jest.fn(() => "http://localstack:4566/bootcamp/avatar.jpg")
}));

jest.mock("../../multer/multer", () => ({
  single: () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.file = {
      originalname: "avatar.jpg",
      buffer: Buffer.from("fake image data"),
      mimetype: "image/jpeg",
      fieldname: "avatar",
      encoding: "7bit",
      size: Buffer.from("fake image data").length,
      stream: null as any,
      destination: "",
      filename: "",
      path: "",
    } as Partial<Express.Multer.File> as Express.Multer.File;
    next();
  }
}));

const server = express();
server.use(json());
userController(server);

describe("User Controller", () => {
  describe("GET /users", () => {
    test("Should return all users", async () => {
      const response = await request(server).get("/users");
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe("User 1");
    });
    
    test("Should return filtered users", async () => {
      const response = await request(server)
        .get("/users")
        .query({ filterBy: "name", filter: "User 1" });
      
      expect(response.status).toBe(200);
    });
  });
  
  describe("GET /users/paginated", () => {
    test("Should return paginated users", async () => {
      const response = await request(server)
        .get("/users/paginated")
        .query({ take: "10", skip: "0" });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
    });
  });
  
  describe("GET /users/:id", () => {
    test("Should return a user by id", async () => {
      const response = await request(server).get("/users/1");
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe("1");
      expect(response.body.name).toBe("User 1");
    });
  });
  
  describe("POST /users/new", () => {
    test("Should create a new user", async () => {
      const response = await request(server)
        .post("/users/new")
        .send({
          name: "New User",
          email: "newuser@example.com",
          password: "password123"
        });
      
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("New User");
      expect(response.body.avatar).toBe("http://localstack:4566/bootcamp/avatar.jpg");
    });
  });
  
  describe("PUT /users/update/:id", () => {
    test("Should update a user", async () => {
      const response = await request(server)
        .put("/users/update/1")
        .send({
          name: "Updated User",
          email: "updated@example.com",
          password: "password123"
        });
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe("1");
      expect(response.body.name).toBe("Updated User");
    });
  });
  
  describe("DELETE /users/delete/:id", () => {
    test("Should delete a user", async () => {
      const response = await request(server).delete("/users/delete/1");
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe("1");
    });
  });
});