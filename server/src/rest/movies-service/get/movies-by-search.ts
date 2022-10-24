import fetch from "node-fetch";
import { Request, Response } from "express";
import { OMDB_API } from "../../../../config";
import path from "path";
import { redis } from "../../../cache";
import { moviesServiceName } from "../index";
import MovieType from "../types/MovieType";
import authLocalData from "../../auth/localData/authData";
import logger from "../../../logger/index";
import { LoggingLevels } from "../../../logger/types";

const cacheMovies = async ({ movieResult, s, type, y }) => {
  let cacheKey = s;

  if (type) {
    cacheKey += `&${type}`;
  }

  if (y) {
    cacheKey += `&${y}`;
  }

  await redis.set(cacheKey, JSON.stringify(movieResult));
};

const tryGetCachedMovies = async ({ s, type, y }) => {
  let cacheKey = s;

  if (type) {
    cacheKey += `&${type}`;
  }

  if (y) {
    cacheKey += `&${y}`;
  }

  const cachedPayload = await redis.get(cacheKey);

  if (s) {
    return JSON.parse(cachedPayload);
  }

  return null;
};

const getMovie = async ({ s, type, y, res }) => {
  const cachedPayload: MovieType | null = await tryGetCachedMovies({
    s,
    type,
    y,
  });

  if (cachedPayload) {
    logger.log(
      LoggingLevels.info,
      "Movies By Search - Cached Movies Returned."
    );
    return res.send(cachedPayload);
  }

  let OMDBendpoint = `${OMDB_API}&s=${s}`;

  if (type) {
    OMDBendpoint += `&type=${type}`;
  }

  if (y) {
    OMDBendpoint += `&y=${y}`;
  }

  const moviePayload = await fetch(OMDBendpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const movieResult: MovieType = await moviePayload.json();

  cacheMovies({
    movieResult,
    s,
    type,
    y,
  });

  logger.log(
    LoggingLevels.info,
    "Movies By Search - Movies Were Cached and Returned."
  );
  return res.send(movieResult);
};

export default ({ app }): void => {
  const endpoint = `/${moviesServiceName}/${path.basename(
    __dirname
  )}-${path.basename(__filename.replace(/\.[^/.]+$/, ""))}`;

  app.get(endpoint, async ({ headers, query }: Request, res: Response) => {
    const authHeader = headers?.authorization;
    if (!authHeader) {
      logger.log(
        LoggingLevels.error,
        "Movies By Search - Unauthorized Request."
      );
      return res.send({ Error: "Unauthorized." });
    }

    const token = authHeader.replace("Bearer ", "");
    const user = authLocalData.getUserDataByToken(token);

    if (!user) {
      logger.log(
        LoggingLevels.error,
        "Movies By Search - Unauthorized Request."
      );
      return res.send({ Error: "Unauthorized." });
    }

    if (query?.s) {
      return await getMovie({ s: query.s, type: query?.type, y: query.y, res });
    }

    logger.log(
      LoggingLevels.error,
      "Movies By Search - Unspecified Parameters."
    );
    return res.send({ Error: "Please specify a title of the searched movie" });
  });
};
