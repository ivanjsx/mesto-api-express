// libraries
import express from "express";
import mongoose from "mongoose";

// routes
import usersRoutes from "./routes/users";

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log("Ссылка на сервер:");
  console.log(BASE_PATH);
});
