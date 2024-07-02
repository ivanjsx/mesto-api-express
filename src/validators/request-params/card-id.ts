// libraries
import { celebrate, Joi, Segments } from "celebrate";



const cardIdParamValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
  })
});

export default cardIdParamValidator;
