// libraries
import { Request, Response } from "express";

// interfaces
import UserInterface from "../interfaces/user";

// models
import User from "../models/user";



export const listUsers = (request: Request, response: Response) => User.find(
  {}
).then(
  (users: Array<UserInterface>) => response.status(200).send(
    { data: users }
  )
).catch(
  () => response.status(500).send(
    { message: "Произошла ошибка" }
  )
);



export const retrieveUser = (request: Request, response: Response) => User.find(
  { _id: request.params.userId }
).then(
  (users: Array<UserInterface>) => response.status(200).send(
    { data: users }
  )
).catch(
  () => response.status(500).send(
    { message: "Произошла ошибка" }
  )
);



export const createUser = (request: Request, response: Response) => User.create(
  {
    name: request.body.name,
    about: request.body.about,
    avatar: request.body.avatar,
  }
).then(
  (user: UserInterface) => response.status(201).send(user)
).catch(
  (error) => response.status(400).send(error)
);
