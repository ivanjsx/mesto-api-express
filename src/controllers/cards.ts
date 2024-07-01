// libraries
import { Request, Response } from "express";

// models
import Card from "../models/card";

// interfaces
import CustomRequest from "../interfaces/custom-request";

// http status codes
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK } from "../utils/http-status-codes";



function listCards(request: Request, response: Response) {
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



function createCard(request: CustomRequest, response: Response) {
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



function removeCard(request: Request, response: Response) {
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



function toggleCardLikes(request: CustomRequest, response: Response, isDislike: boolean) {
  const query = isDislike ? {
    $pull: { likes: request.user!._id }
  } : {
    $addToSet: { likes: request.user!._id }
  };
  return Card.findByIdAndUpdate(
    request.params.cardId,
    query,
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



function likeCard(request: CustomRequest, response: Response) {
  return toggleCardLikes(request, response, false);
};



function dislikeCard(request: CustomRequest, response: Response) {
  return toggleCardLikes(request, response, true);
};



export {
  listCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard
};
