import { describe, expect, test, jest } from "@jest/globals";
import request from "supertest";
import express, { Request, Response, NextFunction, json } from "express";
import activityController from "../../controllers/activity-controller";

// Mock do middleware de autenticação
jest.mock("../../middlewares/auth-guard", () => (req: Request, res: Response, next: NextFunction) => {
  req.userId = "user123";
  next();
});

// Mock dos repositórios
jest.mock("../../repository/activity-repository", () => ({
  getAll: jest.fn(() => [
    { id: "1", title: "Activity 1", description: "Description 1" },
    { id: "2", title: "Activity 2", description: "Description 2" }
  ]),
  getById: jest.fn((id) => 
    id === "1" 
      ? { id: "1", title: "Activity 1", description: "Description 1" } 
      : null
  ),
  create: jest.fn((data: Record<string, any>) => ({ id: "new-id", ...data }))
}));

jest.mock("../../repository/user-activity-repository", () => ({
  getActivitiesByUserId: jest.fn((userId) => [
    { 
      activity: { id: "1", title: "Activity 1", description: "Description 1" } 
    }
  ]),
  createRelations: jest.fn(() => ({ count: 2 }))
}));

const server = express();
server.use(json());
activityController(server);

describe("Activity Controller", () => {
  describe("GET /activities", () => {
    test("Should return all activities", async () => {
      const response = await request(server).get("/activities");
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe("Activity 1");
    });
  });
  
  describe("GET /activities/:id", () => {
    test("Should return an activity by id", async () => {
      const response = await request(server).get("/activities/1");
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe("1");
      expect(response.body.title).toBe("Activity 1");
    });
  });
  
  describe("GET /activities/user/:userId", () => {
    test("Should return activities by user id", async () => {
      const response = await request(server).get("/activities/user/user123");
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe("Activity 1");
    });
  });
  
  describe("POST /activities/new", () => {
    test("Should create a new activity with user relations", async () => {
      const response = await request(server)
        .post("/activities/new")
        .send({
          title: "New Activity",
          description: "New Activity Description",
          userIds: ["user1", "user2"]
        });
      
      expect(response.status).toBe(201);
      expect(response.body.title).toBe("New Activity");
      expect(response.body.id).toBe("new-id");
    });
  });
});