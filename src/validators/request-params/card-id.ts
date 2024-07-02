// libraries
import { celebrate, Joi, Segments } from "celebrate";



const cardIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
  })
});

export default cardIdValidator;
