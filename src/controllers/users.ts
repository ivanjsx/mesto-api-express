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
    () => response.status(500).send(
      { message: "Произошла ошибка" }
    )
  );
};



export function retrieveUser(request: Request, response: Response) {
  return User.findById(request.params.userId).then(
    (user) => response.status(200).send(
      { data: user }
    )
  ).catch(
    () => response.status(500).send(
      { message: "Произошла ошибка" }
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



export function updateUserInfo(request: CustomRequest, response: Response) {
  const { name, about } = request.body;
  return User.findByIdAndUpdate(
    request.user?._id,
    { name, about },
    { new: true, runValidators: true }
  ).then(
    (user) => response.status(200).send(
      { data: user }
    )
  ).catch(
    (error) => response.status(400).send(
      { message: error.message }
    )
  );
};



export function updateUserAvatar(request: CustomRequest, response: Response) {
  const { avatar } = request.body;
  return User.findByIdAndUpdate(
    request.user?._id,
    { avatar },
    { new: true, runValidators: true }
  ).then(
    (user) => response.status(200).send(
      { data: user }
    )
  ).catch(
    (error) => response.status(400).send(
      { message: error.message }
    )
  );
};
