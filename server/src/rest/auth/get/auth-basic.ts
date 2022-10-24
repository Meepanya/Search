import { authName } from "..";
import path from "path";
import { Request, Response } from "express";
import authLocalData from "../localData/authData";
import { LocalAuthData } from "../types/LocalUserData";
import logger from "../../../logger/index";
import { LoggingLevels } from "../../../logger/types";

export default ({ app }): void => {
  const endpoint = `/${authName}/${path.basename(__dirname)}-${path.basename(
    __filename.replace(/\.[^/.]+$/, "")
  )}`;

  app.get(endpoint, async ({ query, headers }: Request, res: Response) => {
    const authHeader = headers?.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const user = authLocalData.getUserDataByToken(token);

      logger.log(LoggingLevels.info, "Auth Basic - Token Authorization");
      return res.send(user);
    }

    if (query?.username && query?.password) {
      const userData: LocalAuthData = {
        username: query.username as string,
        password: query.password as string,
      };
      const user = authLocalData.getUserDataByPassword(userData);

      logger.log(LoggingLevels.info, "Auth Basic - Basic Authorization");
      return res.send(user);
    }

    logger.log(LoggingLevels.error, "Auth Basic - Failed");
    return res.send({ Error: "Email or Password is incorrect." });
  });
};
