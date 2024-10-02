// libraries
import { Response, NextFunction } from "express";
import { verify, JwtPayload, Secret } from "jsonwebtoken";

// interfaces
import AuthenticatedRequest from "../interfaces/authenticated-request";

// errors
import UnauthenticatedError from "../errors/unauthenticated";

// error messages
import { DEFAULT_401_MESSAGE } from "../utils/error-messages";



const createAuthenticationMiddleware = (jwtSecretKey: Secret, tokenCookieName: string) => (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
  
  if (!request.cookies) {
    return next(new UnauthenticatedError(DEFAULT_401_MESSAGE));
  };
  
  const cookie = request.cookies[tokenCookieName];
  
  if (!cookie || !cookie.startsWith("Bearer ")) {
    return next(new UnauthenticatedError(DEFAULT_401_MESSAGE));
  };
  
  const token = cookie.replace("Bearer ", "");
  let payload: JwtPayload;
  
  try {
    payload = verify(token, jwtSecretKey) as JwtPayload;
  } catch (error) {
    return next(new UnauthenticatedError(DEFAULT_401_MESSAGE));
  };
  
  request.user = payload;
  next();
};

export default createAuthenticationMiddleware;
