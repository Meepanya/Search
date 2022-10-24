import { authName } from "..";
import path from "path";
import { Request, Response } from "express";
import authLocalData from "../localData/authData";
import logger from "../../../logger/index";
import { LoggingLevels } from "../../../logger/types";
import { LocalUserError } from "../types/LocalUserData";

export default ({ app }): void => {
  const endpoint = `/${authName}/${path.basename(__dirname)}-${path.basename(
    __filename.replace(/\.[^/.]+$/, "")
  )}`;

  app.post(endpoint, async ({ query }: Request, res: Response) => {
    if (query?.username && query?.password) {
      const userData = {
        username: query.username,
        password: query.password,
      };
      const user = authLocalData.createUserData(userData);

      if ((user as LocalUserError)?.Error) {
        logger.log(
          LoggingLevels.error,
          "Create User - User already exist error."
        );
        return res.send(user);
      }

      logger.log(LoggingLevels.info, "Create User - Completed.");
      return res.send(user);
    }

    logger.log(LoggingLevels.error, "Create User - Failed.");
    return res.send({ Error: "Please provide Password and Username." });
  });
};
