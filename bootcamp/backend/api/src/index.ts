import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import swagger from "swagger-ui-express";
import docs from "./swagger.json";
import userController from "./controllers/user-controller";
import activityController from "./controllers/activity-controller";
import authController from "./controllers/auth-controller";
import { createBucket } from "./services/s3-service";

const server = express();

server.use(json());
server.use(cors());
server.use("/docs", swagger.serve, swagger.setup(docs));

userController(server);
activityController(server);
authController(server);

createBucket();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
