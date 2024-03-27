"use strict";

const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { Profile } = require("./models");
const { defaultProfile } = require("./constant");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares");

const bootstrap = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "boo_assessments" });

  // Create initial profile
  await Profile.create(defaultProfile);

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
