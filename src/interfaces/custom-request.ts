import { Request } from "express";

interface CustomRequestInterface extends Request {
  user?: {
    _id: string
  }
};

export default CustomRequestInterface;
