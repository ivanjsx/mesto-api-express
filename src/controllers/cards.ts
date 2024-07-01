// libraries
import { Request, Response } from "express";

// models
import Card from "../models/card";

// interfaces
import CustomRequest from "../interfaces/custom-request";

// http status codes
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK } from "../utils/http-status-codes";



export function listCards(request: Request, response: Response) {
  return Card.find({}).then(
    (cards) => response.status(OK).send(
      { data: cards }
    )
  ).catch(
    () => response.status(INTERNAL_SERVER_ERROR).send(
      { message: "на сервере произошла ошибка"}
    )
  );
};



export function createCard(request: CustomRequest, response: Response) {
  const { name, link } = request.body;
  return Card.create({ name, link, owner: request.user!._id }).then(
    (card) => response.status(CREATED).send(
      { data: card }
    )
  ).catch(
    (error) => response.status(BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



export function removeCard(request: Request, response: Response) {
  return Card.findByIdAndDelete(request.params.cardId).then(
    (card) => {
      if (!card) {
        return response.status(NOT_FOUND).send(
          { message: "Нет карточки с таким id" }
        );
      };
      return response.status(NO_CONTENT).send();
    }
  ).catch(
    () => response.status(INTERNAL_SERVER_ERROR).send(
      { message: "на сервере произошла ошибка" }
    )
  );
};



export function likeCard(request: CustomRequest, response: Response) {
  return Card.findByIdAndUpdate(
    request.params.cardId,
    { $addToSet: { likes: request.user!._id } },
    { new: true }
  ).then(
    (card) => {
      if (!card) {
        return response.status(NOT_FOUND).send(
          { message: "Нет карточки с таким id" }
        );
      };
      return response.status(OK).send(
        { data: card }
      );
    }
  ).catch(
    () => response.status(INTERNAL_SERVER_ERROR).send(
      { message: "на сервере произошла ошибка" }
    )
  );
};



export function dislikeCard(request: CustomRequest, response: Response) {
  return Card.findByIdAndUpdate(
    request.params.cardId,
    { $pull: { likes: request.user!._id } },
    { new: true }
  ).then(
    (card) => {
      if (!card) {
        return response.status(NOT_FOUND).send(
          { message: "Нет карточки с таким id" }
        );
      };
      return response.status(OK).send(
        { data: card }
      );
    }
  ).catch(
    () => response.status(INTERNAL_SERVER_ERROR).send(
      { message: "на сервере произошла ошибка" }
    )
  );
};
