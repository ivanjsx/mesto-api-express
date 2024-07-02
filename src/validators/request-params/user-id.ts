// libraries
import { celebrate, Joi, Segments } from "celebrate";



const userIdParamValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
  })
});

export default userIdParamValidator;
