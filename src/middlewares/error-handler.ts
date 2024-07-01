// libraries
import { Request, Response } from "express";

// interfaces
import CustomError from "../interfaces/custom-error";

// http status codes
import http from "../utils/http-status-codes";

// error messages
import { DEFAULT_500_MESSAGE } from "../utils/error-messages";



const errorHandler = (error: CustomError, request: Request, response: Response) => {
  const {
    statusCode = http.INTERNAL_SERVER_ERROR,
    message = DEFAULT_500_MESSAGE
  } = error;
  return response.status(statusCode).send({ message });
};

export default errorHandler;
