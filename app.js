"use strict";

const express = require("express");

const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares");

const { setupMongoDb } = require("./setupMongoDb");

const bootstrap = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  await setupMongoDb();

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
