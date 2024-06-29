import { Schema } from "mongoose";

interface CardInterface {
  name: string;
  link: string;
  createdAt: Date;
  owner: Schema.Types.ObjectId;
  likes: Array<Schema.Types.ObjectId>;
};

export default CardInterface;
