// libraries
import { Request, Response } from "express";

// models
import Card from "../models/card";

// interfaces
import CustomRequest from "../interfaces/custom-request";



export function listCards(request: Request, response: Response) {
  return Card.find({}).then(
    (cards) => response.status(200).send(
      { data: cards }
    )
  ).catch(
    (error) => response.status(500).send(
      { message: error.message }
    )
  );
};



export function createCard(request: CustomRequest, response: Response) {
  const { name, link } = request.body;
  return Card.create({ name, link, owner: request.user!._id }).then(
    (card) => response.status(201).send(
      { data: card }
    )
  ).catch(
    (error) => response.status(400).send(
      { message: error.message }
    )
  );
};



export function removeCard(request: Request, response: Response) {
  return Card.findByIdAndDelete(request.params.cardId).then(
    (card) => {
      if (!card) {
        return response.status(404).send(
          { message: "Нет карточки с таким id" }
        );
      };
      return response.status(204).send();
    }
  ).catch(
    (error) => response.status(500).send(
      { message: error.message }
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
        return response.status(404).send(
          { message: "Нет карточки с таким id" }
        );
      };
      return response.status(200).send(
        { data: card }
      );
    }
  ).catch(
    (error) => response.status(500).send(
      { message: error.message }
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
        return response.status(404).send(
          { message: "Нет карточки с таким id" }
        );
      };
      return response.status(200).send(
        { data: card }
      );
    }
  ).catch(
    (error) => response.status(500).send(
      { message: error.message }
    )
  );
};
