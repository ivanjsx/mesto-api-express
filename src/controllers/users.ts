// libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// models
import User from "../models/user";

// interfaces
import UserInterface from "../interfaces/user";
import CustomRequest from "../interfaces/custom-request";

// constants
import { JWT_SECRET } from "../utils/constants";

// http status codes
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../utils/http-status-codes";



function listUsers(request: Request, response: Response) {
  return User.find({}).then(
    (users) => response.status(OK).send(
      { data: users }
    )
  ).catch(
    () => response.status(INTERNAL_SERVER_ERROR).send(
      { message: "на сервере произошла ошибка" }
    )
  );
};



function createUser(request: Request, response: Response) {
  const { name, about, avatar, email, password } = request.body;
  return bcrypt.hash(password, 10).then(
    (hash) => User.create(
      { name, about, avatar, email, password: hash }
    )
  ).then(
    (user) => response.status(CREATED).send(
      { data: user }
    )
  ).catch(
    (error) => response.status(BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



function login(request: Request, response: Response) {
  const { email, password } = request.body;
  return User.findUserByCredentials(email, password).then(
    (user) => response.send({
      token: jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
      ),
    })
  ).catch(
    (error) => response.status(UNAUTHORIZED).send(
      { message: error.message }
    )
  );
};



function retrieveUser(request: Request, response: Response) {
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
        { message: "на сервере произошла ошибка" }
      );
    }
  );
};



function updateUserFields(request: CustomRequest, response: Response, fields: Partial<UserInterface>) {
  return User.findByIdAndUpdate(
    request.user!._id,
    fields,
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



function updateUserInfo(request: CustomRequest, response: Response) {
  const { name, about } = request.body;
  return updateUserFields(request, response, { name, about });
};



function updateUserAvatar(request: CustomRequest, response: Response) {
  const { avatar } = request.body;
  return updateUserFields(request, response, { avatar });
};



export {
  listUsers,
  createUser,
  login,
  retrieveUser,
  updateUserInfo,
  updateUserAvatar,
};
