"use strict";

const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares");
const { Profile, User, Comment } = require("./models");
const {
  defaultProfiles,
  defaultUsers,
  defaultComments,
} = require("./dumpData");

const bootstrap = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

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

  // set the view engine to ejs
  app.set("view engine", "ejs");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // routes
  app.use("/", routes());

  // error handler
  app.use(notFound);
  app.use(errorHandler);

  // start server
  const server = app.listen(port);
  console.log("Express started. Listening on %s", port);
};

bootstrap();
