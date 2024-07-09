// libraries
import { celebrate, Joi, Segments } from "celebrate";



const updateAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri()
  })
});

export default updateAvatarValidator;
