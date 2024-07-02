import winston from "winston";
import expressWinston from "express-winston";
import DailyRotateFile from "winston-daily-rotate-file";



const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(
      { format: winston.format.simple() }
    ),
    new DailyRotateFile({
      filename: "logs/request-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxFiles: "14d"
    })
  ],
  format: winston.format.json()
}); 

const errorLogger = expressWinston.errorLogger({
  transports: [
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxFiles: "14d"
    })
  ],
  format: winston.format.json()
}); 

export {
  errorLogger,
  requestLogger
};
