import connectAuthAPI from "./auth";
import connectMoviesAPI from "./movies-service";
import logger from "../logger/index";
import { LoggingLevels } from "../logger/types";

export default ({ app }): void => {
  app.get("/", (req, res) => {
    logger.log(
      LoggingLevels.notice,
      "Check Health Status - Server Health State was checked"
    );
    return res.send("Health: OK");
  });

  connectMoviesAPI({ app });
  connectAuthAPI({ app });
};
