// libraries
import { Request, Response, NextFunction } from "express";

// errors
import NotFoundError from "../errors/not-found";

// error messages
import { DEFAULT_404_MESSAGE } from "../utils/error-messages";



const throwNotFoundError = (request: Request, response: Response, next: NextFunction) => {
  next(new NotFoundError(DEFAULT_404_MESSAGE));
};

export default throwNotFoundError;
