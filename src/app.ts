// libraries
import dotenv from "dotenv";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// routes
import usersRoutes from "./routes/users";
import cardsRoutes from "./routes/cards";

// middlewares
import rateLimiter from "./middlewares/rate-limiter";
import errorHandler from "./middlewares/error-handler";
import { requestLogger, errorLogger } from "./middlewares/logger";
import throwNotFoundError from "./middlewares/throw-not-found-error";
import createAuthenticationMiddleware from "./middlewares/authentication";

// request body validators
import signUpValidator from "./validators/request-body/sign-up";
import signInValidator from "./validators/request-body/sign-in";

// controllers
import { createSignInController, signUp } from "./controllers/users";



dotenv.config();

const { 
  PORT = 3000,
  TOKEN_COOKIE_NAME = "jwt",
  MONGODB_URI = "mongodb://localhost:27017/mestodb",
  JWT_SECRET_KEY = "yes-i-do-masturbate-to-my-own-code",
} = process.env;



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(rateLimiter);

app.use(requestLogger);

const signIn = createSignInController(JWT_SECRET_KEY, TOKEN_COOKIE_NAME)
app.post("/signup", signUpValidator, signUp);
app.post("/signin", signInValidator, signIn);

const authentication = createAuthenticationMiddleware(JWT_SECRET_KEY, TOKEN_COOKIE_NAME);
app.use(authentication);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use("*", throwNotFoundError);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);



mongoose.connect(MONGODB_URI).then(
  () => console.log("Connected to MongoDB")
).catch(
  error => console.error("Failed to connect to MongoDB", error)
);

app.listen(
  PORT, () => console.log(`Server is running at http://localhost:${PORT}`)
);
