const { Profile, User, Comment } = require("./models");
const {
  defaultProfiles,
  defaultUsers,
  defaultComments,
} = require("./dumpData");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const setupMongoDb = async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "boo_assessments" });

  // Create dump data
  if (process.env.NODE_ENV === "dev") {
    await Promise.all(
      defaultProfiles.map((profile) => Profile.create(profile)),
      defaultUsers.map((user) => User.create(user)),
      defaultComments.map((comment) => Comment.create(comment))
    );
  }
};

module.exports = { setupMongoDb };
