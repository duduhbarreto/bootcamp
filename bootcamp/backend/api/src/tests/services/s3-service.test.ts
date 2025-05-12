import { describe, expect, test, jest, beforeEach, afterEach } from "@jest/globals";
import { createBucket, uploadImage } from "../../services/s3-service";
import { S3Client, CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// Mock do S3Client
jest.mock("@aws-sdk/client-s3", () => {
  const mockSend = jest.fn().mockImplementation(async () => {return {}});
  
  return {
    S3Client: jest.fn().mockImplementation(() => ({
      send: mockSend
    })),
    CreateBucketCommand: jest.fn(),
    PutObjectCommand: jest.fn()
  };
});

describe("S3 Service", () => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { 
      ...originalEnv,
      BUCKET_NAME: "testbucket",
      S3_ENDPOINT: "http://localhost:4566",
      AWS_REGION: "us-east-1",
      AWS_ACCESS_KEY: "test-key",
      AWS_SECRET_ACCESS_KEY: "test-secret"
    };
  });
  
  afterEach(() => {
    process.env = originalEnv;
  });
  
  describe("createBucket", () => {
    test("Should create a bucket", async () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
      
      await createBucket();
      
      expect(CreateBucketCommand).toHaveBeenCalledWith({ Bucket: "testbucket" });
      expect(consoleSpy).toHaveBeenCalledWith("Bucket criado com sucesso.");
      
      consoleSpy.mockRestore();
    });
  });
  
  describe("uploadImage", () => {
    test("Should upload an image and return URL", async () => {
      const file = {
        originalname: "test.jpg",
        buffer: Buffer.from("test image data"),
        mimetype: "image/jpeg",
        fieldname: "avatar",
        encoding: "7bit",
        size: Buffer.from("test image data").length,
        destination: "",
        filename: "",
        path: "",
        stream: {} as any
      } as Express.Multer.File;
      
      const result = await uploadImage(file);
      
      expect(PutObjectCommand).toHaveBeenCalledWith({
        Bucket: "testbucket",
        Key: "test.jpg",
        Body: file.buffer,
        ContentType: "image/jpeg"
      });
      
      expect(result).toBe("http://localhost:4566/testbucket/test.jpg");
    });
  });
});
