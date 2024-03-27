const request = require("supertest");
const { defaultComments } = require("../dumpData");

const errors = require("../errors");

const host = "http://localhost:3000";

describe("CommentModule", () => {
  describe("listComments", () => {
    it("should list comment successful", async () => {
      const response = await request(host).get("/comment");
      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThanOrEqual(
        defaultComments.length
      );
    });
  });

  describe("createComment", () => {
    it("should not create new comment when payload not having valid data", async () => {
      const payload = {
        profileId: "draft",
        mbti: "ENTJ",
        zodiac: "Aries",
        userId: "draft2",
      };

      const response = await request(host).post("/comment").send(payload);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: [
          {
            type: "field",
            msg: "Invalid value",
            path: "content",
            location: "body",
          },
          {
            type: "field",
            msg: "content is required",
            path: "content",
            location: "body",
          },
          {
            type: "field",
            value: "draft",
            msg: "Invalid value",
            path: "profileId",
            location: "body",
          },
          {
            type: "field",
            msg: "Invalid value",
            path: "enneagram",
            location: "body",
          },
          {
            type: "field",
            msg: "enneagram is required",
            path: "enneagram",
            location: "body",
          },
          {
            type: "field",
            value: "draft2",
            msg: "Invalid value",
            path: "userId",
            location: "body",
          },
        ],
        data: {},
      });
    });

    it("should not create new comment when having invalid user", async () => {
      const payload = {
        content: "asdasdasdas",
        profileId: "507f191e810c19729de860ea",
        mbti: "ENTJ",
        enneagram: "3w4",
        zodiac: "Aries",
        userId: "6603d3efcf18a1912adddddd",
      };

      const response = await request(host).post("/comment").send(payload);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(errors.userNotFound);
    });

    it("should not create new comment when having invalid profile", async () => {
      const payload = {
        content: "asdasdasdas",
        profileId: "507f191e810c19729ddddddd",
        mbti: "ENTJ",
        enneagram: "3w4",
        zodiac: "Aries",
        userId: "6603d3efcf18a1912ad8b1bd",
      };

      const response = await request(host).post("/comment").send(payload);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(errors.profileNotFound);
    });

    it("should create new comment successful", async () => {
      const payload = {
        content: "asdasdasdas",
        profileId: "507f191e810c19729de860ea",
        mbti: "ENTJ",
        enneagram: "3w4",
        zodiac: "Aries",
        userId: "6603d3efcf18a1912ad8b1bd",
      };

      const response = await request(host).post("/comment").send(payload);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(expect.objectContaining(payload));
    });
  });

  describe("likeComment", () => {
    it("should throw error when having invalid commentId and userId", async () => {
      const payload = {};
      const response = await request(host)
        .post("/comment/randomId/like")
        .send(payload);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        statusCode: 400,
        message: [
          {
            type: "field",
            value: "randomId",
            msg: "Invalid value",
            path: "_id",
            location: "params",
          },
          {
            type: "field",
            msg: "Invalid value",
            path: "userId",
            location: "body",
          },
          {
            type: "field",
            msg: "userId is required",
            path: "userId",
            location: "body",
          },
        ],
        data: {},
      });
    });

    it("should throw error when user not existed", async () => {
      const payload = { userId: "6603cec1269eeeeeeeeeeeee" };
      const response = await request(host)
        .post("/comment/6603e515f38ac48939320dfc/like")
        .send(payload);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(errors.userNotFound);
    });

    it("should throw error when comment not existed", async () => {
      const payload = { userId: "6603d3efcf18a1912ad8b1bb" };
      const response = await request(host)
        .post("/comment/6603e515f389999999999999/like")
        .send(payload);

      expect(response.status).toEqual(404);
      expect(response.body).toEqual(errors.commentNotFound);
    });

    it("should like comment", async () => {
      const payload = { userId: "6603d3efcf18a1912ad8b1bb" };
      const response = await request(host)
        .post("/comment/6603e515f38ac48939320dfc/like")
        .send(payload);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          content: "asdasdas1231231 123123 12asdasd",
          profileId: "6603cf5af37977088f4b4d02",
          mbti: "ESTP",
          enneagram: "2w3",
          zodiac: "Aries",
          userId: "6603d3efcf18a1912ad8b1bc",
          numberOfLike: 1,
        })
      );
    });

    it("should unlike comment", async () => {
      const payload = { userId: "6603d3efcf18a1912ad8b1bb" };
      const response = await request(host)
        .post("/comment/6603e515f38ac48939320dfc/like")
        .send(payload);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          content: "asdasdas1231231 123123 12asdasd",
          profileId: "6603cf5af37977088f4b4d02",
          mbti: "ESTP",
          enneagram: "2w3",
          zodiac: "Aries",
          userId: "6603d3efcf18a1912ad8b1bc",
          numberOfLike: 0,
        })
      );
    });
  });
});
