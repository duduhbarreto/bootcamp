import { describe, expect, test, jest, beforeEach, afterEach } from "@jest/globals";
import { createBucket, uploadImage } from "../../services/s3-service";

// Importando os tipos, mas sem a implementação real
import type { S3Client, CreateBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// Mock manual explícito (sem jest.mock)
const mockSend = jest.fn<() => Promise<unknown>>().mockResolvedValue({});
const mockCreateBucketCommand = jest.fn<(params: { Bucket: string }) => { input: { Bucket: string } }>().mockImplementation((params) => {
  return { input: params };
});
const mockPutObjectCommand = jest.fn<(params: { Bucket: string; Key: string; Body: Buffer; ContentType: string }) => { Bucket: string; Key: string; Body: Buffer; ContentType: string }>().mockImplementation((params) => params);

// Mock da classe S3Client
const mockS3Client = {
  send: mockSend
};

// Substituir as implementações reais por mocks
jest.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: jest.fn().mockImplementation(() => mockS3Client),
    CreateBucketCommand: mockCreateBucketCommand,
    PutObjectCommand: mockPutObjectCommand
  };
});

describe("S3 Service", () => {
  const originalEnv = process.env;
  
  beforeEach(() => {
    // Limpar todos os mocks
    jest.clearAllMocks();
    
    // Configurar variáveis de ambiente para os testes
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
      
      // Verificar se o comando foi criado com o bucket correto
      expect(mockCreateBucketCommand).toHaveBeenCalledWith({ Bucket: "testbucket" });
      expect(mockSend).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Bucket criado com sucesso.");
      
      consoleSpy.mockRestore();
    });
  });
  
  describe("uploadImage", () => {
    test("Should upload an image and return URL", async () => {
      // Mock do arquivo para teste
      const file = {
        originalname: "test.jpg",
        buffer: Buffer.from("test image data"),
        mimetype: "image/jpeg",
        fieldname: "avatar",
        encoding: "7bit",
        size: Buffer.from("test image data").length,
        destination: "",
        filename: "",
        path: ""
      } as Express.Multer.File;
      
      // Executar o método de upload
      const result = await uploadImage(file);
      
      // Verificar se o comando foi criado com os parâmetros corretos
      expect(mockPutObjectCommand).toHaveBeenCalledWith({
        Bucket: "testbucket",
        Key: "test.jpg",
        Body: file.buffer,
        ContentType: "image/jpeg"
      });
      
      // Verificar se a URL retornada está correta
      expect(result).toBe("http://localhost:4566/testbucket/test.jpg");
    });
  });
});