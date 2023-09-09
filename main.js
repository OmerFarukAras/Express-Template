// node --loader esm-module-alias/loader --no-warnings main.js
import "dotenv/config.js";

import Express from "express";
const app = Express();

import { expressLogger } from "@utils/expressLogger.js";
import { loadRoutes } from "@services/routes.js";
import { MongooseService } from "@services/mongoose.js";
import Logger from "@services/logger.js";

const logger = new Logger();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(expressLogger);

MongooseService(logger);
loadRoutes(app, logger);

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(3000, () => {
  logger.info("Server running on port 3000");
});
