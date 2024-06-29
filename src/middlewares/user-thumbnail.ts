// libraries
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: {
    _id: string
  }
};

const userThumbnail = (request: CustomRequest, response: Response, next: NextFunction) => {
  request.user = {
    _id: "6680230c9e4cd53ed4fc6ebf"
  };
  next();
};

export default userThumbnail;
