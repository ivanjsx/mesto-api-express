// libraries
import { Request, Response } from "express";

// models
import User from "../models/user";

// interfaces
import CustomRequest from "interfaces/custom-request";

// http status codes
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../utils/http-status-codes";



export function listUsers(request: Request, response: Response) {
  return User.find({}).then(
    (users) => response.status(OK).send(
      { data: users }
    )
  ).catch(
    (error) => response.status(INTERNAL_SERVER_ERROR).send(
      { message: error.message }
    )
  );
};



export function createUser(request: Request, response: Response) {
  const { name, about, avatar } = request.body;
  return User.create({ name, about, avatar }).then(
    (user) => response.status(CREATED).send(
      { data: user }
    )
  ).catch(
    (error) => response.status(BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



export function retrieveUser(request: Request, response: Response) {
  return User.findById(request.params.userId).then(
    (user) => {
      if (!user) {
        return response.status(NOT_FOUND).send(
          { message: "Нет пользователя с таким id" }
        );
      };
      return response.status(OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => {
      if (error.name === "CastError") {
        return response.status(BAD_REQUEST).send(
          { message: "Невалидный id" }
        );
      };
      return response.status(INTERNAL_SERVER_ERROR).send(
        { message: error.message }
      );
    }
  );
};



export function updateUserInfo(request: CustomRequest, response: Response) {
  const { name, about } = request.body;
  return User.findByIdAndUpdate(
    request.user!._id,
    { name, about },
    { new: true, runValidators: true }
  ).then(
    (user) => {
      if (!user) {
        return response.status(NOT_FOUND).send(
          { message: "Нет пользователя с таким id" }
        );
      };
      return response.status(OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => response.status(BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



export function updateUserAvatar(request: CustomRequest, response: Response) {
  const { avatar } = request.body;
  return User.findByIdAndUpdate(
    request.user!._id,
    { avatar },
    { new: true, runValidators: true }
  ).then(
    (user) => {
      if (!user) {
        return response.status(NOT_FOUND).send(
          { message: "Нет пользователя с таким id" }
        );
      };
      return response.status(OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => response.status(BAD_REQUEST).send(
      { message: error.message }
    )
  );
};
