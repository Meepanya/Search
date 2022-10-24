import { REDIS } from "../../config";
import { createClient } from "redis";
import { RedisClientType } from "@redis/client/dist/lib/client";
import logger from "../logger/index";
import { LoggingLevels } from "../logger/types";

export let redis: RedisClientType;

const cache = async (): Promise<void> => {
  redis = createClient({
    url: `redis://${REDIS.REDIS_USERNAME}:${REDIS.REDIS_PASSWORD}@${REDIS.REDIS_HOST}:${REDIS.REDIS_PORT}`,
  });
  redis.on("error", (err) =>
    logger.log(LoggingLevels.error, `Redis Client Error - ${err}`)
  );
  await redis.connect();
};

export default cache;
