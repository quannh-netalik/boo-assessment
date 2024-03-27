const request = require("supertest");
const { defaultUsers } = require("../dumpData");

const host = "http://localhost:3000";

describe("UserModule", () => {
  describe("listUsers", () => {
    it("should list users successful", async () => {
      const response = await request(host).get("/user");
      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThanOrEqual(defaultUsers.length);
    });
  });

  describe("createUser", () => {
    it("should throw error create user when having invalid payload", async () => {
      const payload = {};
      const response = await request(host).post("/user").send(payload);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(
        expect.objectContaining({
          statusCode: 400,
          message: [
            {
              type: "field",
              msg: "Invalid value",
              path: "name",
              location: "body",
            },
            {
              type: "field",
              msg: "name is required",
              path: "name",
              location: "body",
            },
          ],
          data: {},
        })
      );
    });

    it("should create user successful", async () => {
      const payload = { name: "userTest" };
      const response = await request(host).post("/user").send(payload);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(expect.objectContaining(payload));
    });
  });
});
