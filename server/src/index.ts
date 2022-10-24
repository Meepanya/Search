import express, { Application } from "express";
import cors from "cors";
import { PORT } from "../config";
import rest from "./rest";
import cache from "./cache";

import logger from "./logger/index";
import { LoggingLevels } from "./logger/types";

const app: Application = express();

const server = async (): Promise<void> => {
  app.use(cors());
  rest({ app });
  await cache();

  app.listen(PORT);
  console.log(`Server started on Port: ${PORT}`);
  logger.log(LoggingLevels.info, `Server started on ${PORT}`);
};

server();
