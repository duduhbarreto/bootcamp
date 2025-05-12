import { describe, expect, test, jest } from "@jest/globals";
import { createUser } from "../../services/user-service";
import bcrypt from "bcryptjs";
import { create } from "../../repository/user-repository";

const password = "123456";
const mockEncryptedPassword = "abcd";

const userData = {
  name: "Igor",
  email: "igor@gmail.com",
  password,
};

const createdUser = {
  ...userData,
  id: "1",
  password: bcrypt.hash(password, 10),
};

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => mockEncryptedPassword),
}));

jest.mock("../../repository/user-repository", () => ({
  create: jest.fn(() => createdUser),
}));

describe("User Service", () => {
  describe("createUser", () => {
    test("Should return user data when user is successfully created", async () => {
      const user = await createUser(userData);
      expect(user).toEqual(createdUser);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(create).toHaveBeenCalledWith({
        ...userData,
        password: mockEncryptedPassword,
      });
    });
  });
});
