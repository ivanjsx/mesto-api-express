// libraries
import { Request, Response } from "express";

// models
import Card from "../models/card";

// interfaces
import AuthenticatedRequest from "../interfaces/authenticated-request";

// http status codes
import http from "../utils/http-status-codes";

// error messages
import {
  CARD_OWNER_RESTRICTION_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  DEFAULT_500_MESSAGE
} from "../utils/error-messages";



function listCards(request: Request, response: Response) {
  return Card.find({}).then(
    (cards) => response.status(http.OK).send(
      { data: cards }
    )
  ).catch(
    () => response.status(http.INTERNAL_SERVER_ERROR).send(
      { message: DEFAULT_500_MESSAGE }
    )
  );
};



function createCard(request: AuthenticatedRequest, response: Response) {
  const { name, link } = request.body;
  return Card.create({ name, link, owner: request.user }).then(
    (card) => response.status(http.CREATED).send(
      { data: card }
    )
  ).catch(
    (error) => response.status(http.BAD_REQUEST).send(
      { message: error.message }
    )
  );
};



function removeCard(request: AuthenticatedRequest, response: Response) {
  return Card.findByIdAndDelete(request.params.cardId).then(
    (card) => {
      if (!card) {
        return response.status(http.NOT_FOUND).send(
          { message: CARD_NOT_FOUND_MESSAGE }
        );
      };
      if (card.owner !== request.user) {
        return response.status(http.FORBIDDEN).send(
          { message: CARD_OWNER_RESTRICTION_MESSAGE }
        );
      };
      return response.status(http.NO_CONTENT).send();
    }
  ).catch(
    () => response.status(http.INTERNAL_SERVER_ERROR).send(
      { message: DEFAULT_500_MESSAGE }
    )
  );
};



function toggleCardLikes(request: AuthenticatedRequest, response: Response, isDislike: boolean) {
  const query = isDislike ? {
    $pull: { likes: request.user }
  } : {
    $addToSet: { likes: request.user }
  };
  return Card.findByIdAndUpdate(
    request.params.cardId,
    query,
    { new: true }
  ).then(
    (card) => {
      if (!card) {
        return response.status(http.NOT_FOUND).send(
          { message: CARD_NOT_FOUND_MESSAGE }
        );
      };
      return response.status(http.OK).send(
        { data: card }
      );
    }
  ).catch(
    () => response.status(http.INTERNAL_SERVER_ERROR).send(
      { message: DEFAULT_500_MESSAGE }
    )
  );
};



function likeCard(request: AuthenticatedRequest, response: Response) {
  return toggleCardLikes(request, response, false);
};



function dislikeCard(request: AuthenticatedRequest, response: Response) {
  return toggleCardLikes(request, response, true);
};



export {
  likeCard,
  listCards,
  createCard,
  removeCard,
  dislikeCard
};
