// libraries
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

// models
import User from "../models/user";

// interfaces
import UserInterface from "../interfaces/user";
import AuthenticatedRequest from "../interfaces/authenticated-request";

// validators
import passwordValidator from "../validators/password";

// constants
import { JWT_SECRET } from "../utils/constants";

// http status codes
import http from "../utils/http-status-codes";

// error messages
import {
  MISSING_CREDENTIALS_MESSAGE,
  CONFLICTING_EMAIL_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  DEFAULT_500_MESSAGE
} from "../utils/error-messages";



function listUsers(request: Request, response: Response) {
  return User.find({}).then(
    (users) => response.status(http.OK).send(
      { data: users }
    )
  ).catch(
    () => response.status(http.INTERNAL_SERVER_ERROR).send(
      { message: DEFAULT_500_MESSAGE }
    )
  );
};



function signUp(request: Request, response: Response) {
  const { name, about, avatar, email, password } = request.body;
  if (!password) {
    return response.status(http.BAD_REQUEST).send(
      { message: MISSING_CREDENTIALS_MESSAGE }
    );
  };
  if (!passwordValidator.validator(password)) {
    return response.status(http.BAD_REQUEST).send(
      { message: passwordValidator.getMessage() }
    );
  };
  return bcrypt.hash(password, 10).then(
    (hash) => User.create(
      { name, about, avatar, email, password: hash }
    )
  ).then(
    (user) => response.status(http.CREATED).send(
      { data: user }
    )
  ).catch(
    (error) => error.code === 11000 ? response.status(http.CONFLICT).send(
      { message: CONFLICTING_EMAIL_MESSAGE }
    ) : response.status(http.BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



function signIn(request: Request, response: Response) {
  const { email, password } = request.body;
  return User.findUserByCredentials(email, password).then(
    (user) => response.send({
      token: sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: "7d" }
      ),
    })
  ).catch(
    (error) => response.status(http.UNAUTHENTICATED).send(
      { message: error.message }
    )
  );
};



function findUserById(request: AuthenticatedRequest, response: Response, fromParams: boolean) {
  const userId = fromParams ? request.params.userId : request.user;
  return User.findById(userId).then(
    (user) => {
      if (!user) {
        return response.status(http.NOT_FOUND).send(
          { message: USER_NOT_FOUND_MESSAGE }
        );
      };
      return response.status(http.OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => {
      if (error.name === "CastError") {
        return response.status(http.BAD_REQUEST).send(
          { message: INVALID_USER_ID_MESSAGE }
        );
      };
      return response.status(http.INTERNAL_SERVER_ERROR).send(
        { message: DEFAULT_500_MESSAGE }
      );
    }
  );
};



function retrieveUser(request: Request, response: Response) {
  return findUserById(request, response, true);
};



function getMe(request: AuthenticatedRequest, response: Response) {
  return findUserById(request, response, false);
};



function updateUserFields(request: AuthenticatedRequest, response: Response, fields: Partial<UserInterface>) {
  return User.findByIdAndUpdate(
    request.user,
    fields,
    { new: true, runValidators: true }
  ).then(
    (user) => {
      if (!user) {
        return response.status(http.NOT_FOUND).send(
          { message: USER_NOT_FOUND_MESSAGE }
        );
      };
      return response.status(http.OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => response.status(http.BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



function updateUserInfo(request: AuthenticatedRequest, response: Response) {
  const { name, about } = request.body;
  return updateUserFields(request, response, { name, about });
};



function updateUserAvatar(request: AuthenticatedRequest, response: Response) {
  const { avatar } = request.body;
  return updateUserFields(request, response, { avatar });
};



export {
  getMe,
  signIn,
  signUp,
  listUsers,
  retrieveUser,
  updateUserInfo,
  updateUserAvatar
};
