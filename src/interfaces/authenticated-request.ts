import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
};

export default AuthenticatedRequest;
