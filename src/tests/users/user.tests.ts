import request from "supertest";
import express, { Application } from "express";

// Import the controller
import { registerUser } from "../../services/userService/userController/user.controller";

// Mock dependencies
jest.mock("../../services/userService/userService/user.service"); // mock service
jest.mock("../../config/redis.config", () => ({
  del: jest.fn(), // fake redis.del
}));

jest.mock("../../../src/utils/response", () => ({
  __esModule: true,
  default: {
    SuccessResponse: jest.fn((res, status, payload) =>
      res.status(status).json({ success: true, ...payload })
    ),
    FailureResponse: jest.fn((res, status, payload) =>
      res.status(status).json({ success: false, ...payload })
    ),
  },
}));

import { registerUserService } from "../../services/userService/userService/user.service";
import RESPONSE from "../../../src/utils/response";
import redis from "../../config/redis.config";

let app: Application;

beforeAll(() => {
  app = express();
  app.use(express.json());
  app.post("/api/v1/users/register", registerUser);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("User Registration API", () => {
  it("✅ should register a new user successfully", async () => {
    (registerUserService as jest.Mock).mockResolvedValueOnce({
      error: false,
      status: 201,
      message: "User registered successfully.",
      data: { id: "123", fullName: "Test User", email: "test@example.com" },
    });

    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        fullName: "Test User",
        email: "test@example.com",
        username: "testuser",
        password: "Password123!",
        avatarUrl: "http://image.com/avatar.png",
      });

    expect(res.status).toBe(201);
    expect(RESPONSE.SuccessResponse).toHaveBeenCalled();
    expect(redis.del).toHaveBeenCalledWith("users:all");
    expect(res.body.success).toBe(true);
    expect(res.body.data[0].email).toBe("test@example.com");
  });

  it("❌ should fail if user already exists", async () => {
    (registerUserService as jest.Mock).mockResolvedValueOnce({
      error: true,
      status: 409,
      message: "User with these email or username already exists. Please login!",
    });

    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        fullName: "Test User",
        email: "duplicate@example.com",
        username: "dupuser",
        password: "Password123!",
        avatarUrl: "http://image.com/avatar.png",
      });

    expect(res.status).toBe(409);
    expect(RESPONSE.FailureResponse).toHaveBeenCalled();
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("already exists");
  });

  it("❌ should fail if avatarUrl is missing", async () => {
    const res = await request(app)
      .post("/api/v1/users/register")
      .send({
        fullName: "Test User",
        email: "test2@example.com",
        username: "user2",
        password: "Password123!",
      });

    expect(res.status).toBe(400);
    expect(RESPONSE.FailureResponse).toHaveBeenCalled();
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Avatar URL is required. Upload file first.");
  });
});
