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
    () => response.status(500).send(
      { message: "Произошла ошибка" }
    )
  );
};



export function createCard(request: CustomRequest, response: Response) {
  const { name, link } = request.body;
  return Card.create({ name, link, owner: request.user }).then(
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
    () => response.status(204).send(
      {}
    )
  ).catch(
    () => response.status(500).send(
      { message: "Произошла ошибка" }
    )
  );
};
