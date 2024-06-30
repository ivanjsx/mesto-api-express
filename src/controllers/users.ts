// libraries
import { Request, Response } from "express";

// models
import User from "../models/user";
import CustomRequest from "interfaces/custom-request";



export function listUsers(request: Request, response: Response) {
  return User.find({}).then(
    (users) => response.status(200).send(
      { data: users }
    )
  ).catch(
    (error) => response.status(500).send(
      { message: error.message }
    )
  );
};



export function createUser(request: Request, response: Response) {
  const { name, about, avatar } = request.body;
  return User.create({ name, about, avatar }).then(
    (user) => response.status(201).send(
      { data: user }
    )
  ).catch(
    (error) => response.status(400).send(
      { message: error.message }
    )
  );
};



export function retrieveUser(request: Request, response: Response) {
  return User.findById(request.params.userId).then(
    (user) => {
      if (!user) {
        return response.status(404).send(
          { message: "Нет пользователя с таким id" }
        );
      };
      return response.status(200).send(
        { data: user }
      );
    }
  ).catch(
    (error) => {
      if (error.name === "CastError") {
        return response.status(400).send(
          { message: "Невалидный id" }
        );
      };
      return response.status(500).send(
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
        return response.status(404).send(
          { message: "Нет пользователя с таким id" }
        );
      };
      return response.status(200).send(
        { data: user }
      );
    }
  ).catch(
    (error) => response.status(400).send(
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
        return response.status(404).send(
          { message: "Нет пользователя с таким id" }
        );
      };
      return response.status(200).send(
        { data: user }
      );
    }
  ).catch(
    (error) => response.status(400).send(
      { message: error.message }
    )
  );
};
