// libraries
import bcrypt from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// models
import User from "../models/user";

// interfaces
import UserInterface from "../interfaces/user";
import AuthenticatedRequest from "../interfaces/authenticated-request";

// validators
import passwordValidator from "../validators/password";

// helpers
import escapeFields from "../utils/escape-fields";

// http status codes
import http from "../utils/http-status-codes";

// errors
import ConflictError from "../errors/conflict";
import NotFoundError from "../errors/not-found";
import BadRequestError from "../errors/bad-request";

// error messages
import {
  CONFLICTING_EMAIL_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE
} from "../utils/error-messages";



function listUsers(request: Request, response: Response, next: NextFunction) {
  return User.find({}).then(
    (users) => response.status(http.OK).send(
      { data: users }
    )
  ).catch(next);
};



function signUp(request: Request, response: Response, next: NextFunction) {
  const { name, about, avatar, email, password } = escapeFields(request.body);
  if (!passwordValidator.validator(password)) {
    throw new BadRequestError(passwordValidator.getMessage());
  };
  return bcrypt.hash(password, 10).then(
    (hash) => User.create(
      { name, about, avatar, email, password: hash }
    )
  ).then(
    (user) => {
      const { _id, name, about, avatar, email } = user;
      return response.status(http.CREATED).send(
        { data: { _id, name, about, avatar, email } }
      )
    }
  ).catch(
    (error) => error.code === 11000 ? next(
      new ConflictError(CONFLICTING_EMAIL_MESSAGE)
    ) : next(error)
  );
};



const createSignInController = (jwtSecretKey: Secret, tokenCookieName: string) => function (request: Request, response: Response, next: NextFunction) {
  const { email, password } = escapeFields(request.body);
  return User.findUserByCredentials(email, password).then(
    (user) => {
      const token = sign({ _id: user._id }, jwtSecretKey, { expiresIn: "7d" });
      return response.cookie(
        tokenCookieName, `Bearer ${token}`, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: true
        }
      ).end();
    }
  ).catch(next);
};



function findUserById(request: AuthenticatedRequest, response: Response, next: NextFunction, fromParams: boolean) {
  const userId = fromParams ? request.params.userId : request.user;
  return User.findById(userId).then(
    (user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      };
      return response.status(http.OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => error.name === "CastError" ? next(
      new BadRequestError(INVALID_USER_ID_MESSAGE)
    ) : next(error)
  );
};



function retrieveUser(request: Request, response: Response, next: NextFunction) {
  return findUserById(request, response, next, true);
};



function getMe(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  return findUserById(request, response, next, false);
};



function updateUserFields(request: AuthenticatedRequest, response: Response, next: NextFunction, fields: Partial<UserInterface>) {
  return User.findByIdAndUpdate(
    request.user,
    fields,
    { new: true, runValidators: true }
  ).then(
    (user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      };
      return response.status(http.OK).send(
        { data: user }
      );
    }
  ).catch(
    (error) => error.name === "CastError" ? next(
      new BadRequestError(INVALID_USER_ID_MESSAGE)
    ) : next(error)    
  );
};



function updateInfo(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  const { name, about } = escapeFields(request.body);
  return updateUserFields(request, response, next, { name, about });
};



function updateAvatar(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  const { avatar } = escapeFields(request.body);
  return updateUserFields(request, response, next, { avatar });
};



export {
  getMe,
  signUp,
  listUsers,
  updateInfo,
  updateAvatar,
  retrieveUser,
  createSignInController,
};
