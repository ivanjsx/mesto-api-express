// libraries
import { Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

// interfaces
import AuthenticatedRequest from "../interfaces/authenticated-request";

// constants
import { JWT_SECRET } from "../utils/constants";

// http status codes
import http from "../utils/http-status-codes";

// error messages
import { DEFAULT_401_MESSAGE } from "../utils/error-messages";



const handleAuthenticationError = (response: Response) => {
  return response.status(http.UNAUTHENTICATED).send(
    { message: DEFAULT_401_MESSAGE }
  );
};



const authentication = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {

  const { authorization } = request.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthenticationError(response);
  };

  const token = authorization.replace("Bearer ", "");
  let payload: JwtPayload | string;
  try {
    payload = verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthenticationError(response);
  };

  request.user = payload;
  next();
};

export default authentication;
