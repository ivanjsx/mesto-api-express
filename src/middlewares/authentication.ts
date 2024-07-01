// libraries
import { verify, JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";

// interfaces
import CustomRequest from "../interfaces/custom-request";

// http status codes
import { JWT_SECRET } from "../utils/constants";
import { UNAUTHORIZED } from "../utils/http-status-codes";



const handleAuthenticationError = (response: Response) => {
  return response.status(UNAUTHORIZED).send(
    { message: "Необходима авторизация" }
  );
};



const authentication = (request: CustomRequest, response: Response, next: NextFunction) => {

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
