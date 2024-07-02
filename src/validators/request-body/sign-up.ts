// libraries
import { celebrate, Joi, Segments } from "celebrate";

// constants
import {
  MIN_PASSWORD_LENGTH,
  MIN_ABOUT_LENGTH,
  MAX_ABOUT_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH
} from "../../utils/constants";



const signUpValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    about: Joi.string().min(MIN_ABOUT_LENGTH).max(MAX_ABOUT_LENGTH),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_PASSWORD_LENGTH)
  })
});

export default signUpValidator;
