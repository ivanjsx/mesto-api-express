// libraries
import { celebrate, Joi, Segments } from "celebrate";

// constants
import { MIN_PASSWORD_LENGTH } from "../../utils/constants";



const signInValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(MIN_PASSWORD_LENGTH)
  })
});

export default signInValidator;
