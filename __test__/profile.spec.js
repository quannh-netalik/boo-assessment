const request = require("supertest");
const { defaultProfiles } = require("../dumpData");

const errors = require("../errors");

const host = "http://localhost:3000";

describe("ProfileModule", () => {
  it("should list profile successful", async () => {
    const response = await request(host).get("/profile");

    expect(response.status).toEqual(200);
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(response.body.map(({ _id }) => _id)).toEqual(
      defaultProfiles.map(({ _id }) => _id)
    );
  });

  it("should get profile _id based successful", async () => {
    const response = await request(host).get(
      `/profile/${defaultProfiles[0]._id}`
    );

    expect(response.status).toEqual(200);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining(defaultProfiles[0]));
  });

  it("should throw error when request invalid objectId", async () => {
    const response = await request(host).get(`/profile/123123123`);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual(errors.invalidObjectId);
  });

  it("should throw error when not found profile _id based", async () => {
    const response = await request(host).get(
      `/profile/4d3ed089fb60ab534684b7e9`
    );

    expect(response.status).toEqual(404);
    expect(response.body).toEqual(errors.profileNotFound);
  });

  it("should not create profile when having no/invalid data", async () => {
    const profilePayload = {
      name: "A Martinez",
      mbti: "ISFK",
      variant: "sp/so",
      socionics: "SEE",
      psyche: "FEVL",
    };

    const response = await request(host).post("/profile").send(profilePayload);

    expect(response.status).toEqual(400);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      data: {},
      message: [
        {
          location: "body",
          msg: "Invalid value",
          path: "description",
          type: "field",
        },
        {
          location: "body",
          msg: "description is required",
          path: "description",
          type: "field",
        },
        {
          location: "body",
          msg: "Invalid value",
          path: "mbti",
          type: "field",
          value: "ISFK",
        },
        {
          location: "body",
          msg: "Invalid value",
          path: "enneagram",
          type: "field",
        },
        {
          location: "body",
          msg: "enneagram is required",
          path: "enneagram",
          type: "field",
        },
        {
          location: "body",
          msg: "Invalid value",
          path: "tritype",
          type: "field",
        },
        {
          location: "body",
          msg: "tritype is required",
          path: "tritype",
          type: "field",
        },
        {
          location: "body",
          msg: "sloan is required",
          path: "sloan",
          type: "field",
        },
        {
          location: "body",
          msg: "Invalid value",
          path: "temperaments",
          type: "field",
        },
        {
          location: "body",
          msg: "temperaments is required",
          path: "temperaments",
          type: "field",
        },
      ],
      statusCode: 400,
    });
  });

  it("should create profile successful", async () => {
    const profilePayload = {
      name: "A Martinez",
      description: "Adolph Larrue Martinez III.",
      mbti: "ISFJ",
      enneagram: "9w3",
      variant: "sp/so",
      tritype: 725,
      socionics: "SEE",
      sloan: "RCOEN",
      psyche: "FEVL",
      temperaments: "TEMP",
    };
    const response = await request(host).post("/profile").send(profilePayload);

    expect(response.status).toEqual(201);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(expect.objectContaining(profilePayload));
  });
});
