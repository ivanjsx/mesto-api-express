import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequestInterface extends Request {
  user?: JwtPayload;
};

export default AuthenticatedRequestInterface;
