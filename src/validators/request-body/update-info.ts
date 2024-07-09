// libraries
import { celebrate, Joi, Segments } from "celebrate";

// constants
import {
  MIN_ABOUT_LENGTH,
  MAX_ABOUT_LENGTH,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from "../../utils/constants";



const updateInfoValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    about: Joi.string().required().min(MIN_ABOUT_LENGTH).max(MAX_ABOUT_LENGTH)
  })
});

export default updateInfoValidator;
