// libraries
import { Response, NextFunction } from "express";

// interfaces
import CustomRequest from "../interfaces/custom-request";



const userThumbnail = (request: CustomRequest, response: Response, next: NextFunction) => {
  request.user = {
    _id: "6680230c9e4cd53ed4fc6ebf"
  };
  next();
};

export default userThumbnail;
