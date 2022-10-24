import { LoggingLevels } from "./types";
import path from "path";

const { createLogger, transports } = require("winston");
require("winston-daily-rotate-file");

const logger = createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/emerg-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.emerg,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/alert-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.alert,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/crit-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.crit,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/error-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.error,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/warning-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.warning,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/notice-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.notice,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/info-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.info,
    }),
    new transports.DailyRotateFile({
      filename: path.join(__dirname, "/logs/debug-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      level: LoggingLevels.debug,
    }),
  ],
});

export default logger;
