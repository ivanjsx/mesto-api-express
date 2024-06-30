// libraries
import express from "express";
import mongoose from "mongoose";

// routes
import usersRoutes from "./routes/users";
import cardsRoutes from "./routes/cards";

// middlewares
import userThumbnail from "./middlewares/user-thumbnail";



mongoose.connect("mongodb://localhost:27017/mestodb");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userThumbnail);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log("Ссылка на сервер:");
  console.log(`http://localhost:${PORT}`);
});
