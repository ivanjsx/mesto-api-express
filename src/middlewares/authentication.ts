// libraries
import { Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

// interfaces
import AuthenticatedRequest from "../interfaces/authenticated-request";

// constants
import { JWT_SECRET } from "../utils/constants";

// errors
import UnauthenticatedError from "../errors/unauthenticated";

// error messages
import { DEFAULT_401_MESSAGE } from "../utils/error-messages";



const authentication = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {

  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthenticatedError(DEFAULT_401_MESSAGE));
  };

  const token = authorization.replace("Bearer ", "");
  let payload: JwtPayload | string;
  try {
    payload = verify(token, JWT_SECRET);
  } catch (error) {
    return next(new UnauthenticatedError(DEFAULT_401_MESSAGE));
  };

  request.user = payload;
  next();
};

export default authentication;
