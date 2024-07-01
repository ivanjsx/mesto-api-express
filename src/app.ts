// libraries
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// routes
import usersRoutes from "./routes/users";
import cardsRoutes from "./routes/cards";

// middlewares
import userThumbnail from "./middlewares/user-thumbnail";

// controllers
import { createUser, login } from "./controllers/users";



dotenv.config();

const { PORT = 3000, MONGODB_URI = "" } = process.env;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userThumbnail);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.post("/signin", login);
app.post("/signup", createUser);

mongoose.connect(MONGODB_URI).then(
  () => console.log("Connected to MongoDB")
).catch(
  error => console.error("Failed to connect to MongoDB", error)
);

app.listen(
  PORT, () => console.log(`Server is running at http://localhost:${PORT}`)
);
