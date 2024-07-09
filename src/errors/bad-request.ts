// interfaces
import CustomErrorInterface from "../interfaces/custom-error";

// http status codes
import http from "../utils/http-status-codes";



class BadRequestError extends Error implements CustomErrorInterface {

  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = http.BAD_REQUEST;
  };
};

export default BadRequestError;
