// libraries
import { celebrate, Joi, Segments } from "celebrate";

// constants
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from "../../utils/constants";



const createCardValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(MIN_NAME_LENGTH).max(MAX_NAME_LENGTH),
    link: Joi.string().required().uri()
  })
});

export default createCardValidator;
