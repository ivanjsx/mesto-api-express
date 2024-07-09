// libraries
import { ObjectId } from "mongodb";
import { NextFunction, Request, Response } from "express";

// models
import Card from "../models/card";

// interfaces
import AuthenticatedRequest from "../interfaces/authenticated-request";

// helpers
import escapeFields from "../utils/escape-fields";

// http status codes
import http from "../utils/http-status-codes";

// errors
import NotFoundError from "../errors/not-found";
import ForbiddenError from "../errors/forbidden";

// error messages
import {
  CARD_OWNER_RESTRICTION_MESSAGE,
  CARD_NOT_FOUND_MESSAGE
} from "../utils/error-messages";



function listCards(request: Request, response: Response, next: NextFunction) {
  return Card.find({}).then(
    (cards) => response.status(http.OK).send(
      { data: cards }
    )
  ).catch(next);
};



function createCard(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  const { name, link } = escapeFields(request.body);
  return Card.create({ name, link, owner: request.user }).then(
    (card) => response.status(http.CREATED).send(
      { data: card }
    )
  ).catch(next);
};



function removeCard(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  return Card.findById(request.params.cardId).then(
    (card) => {
      if (!card) {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      };
      if (card.owner.toString() !== request.user!._id) {
        throw new ForbiddenError(CARD_OWNER_RESTRICTION_MESSAGE);
      };
      return Card.deleteOne({ _id: new ObjectId(request.params.cardId) });
    }
  ).then(
    () => response.status(http.NO_CONTENT).send()
  ).catch(next);
};



function toggleCardLikes(request: AuthenticatedRequest, response: Response, next: NextFunction, isDislike: boolean) {
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
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      };
      return response.status(http.OK).send(
        { data: card }
      );
    }
  ).catch(next);
};



function likeCard(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  return toggleCardLikes(request, response, next, false);
};



function dislikeCard(request: AuthenticatedRequest, response: Response, next: NextFunction) {
  return toggleCardLikes(request, response, next, true);
};



export {
  likeCard,
  listCards,
  createCard,
  removeCard,
  dislikeCard
};
