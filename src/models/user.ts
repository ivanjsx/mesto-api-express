// libraries
import { model, Schema } from "mongoose";

// interfaces
import UserInterface from "../interfaces/user";

// validators
import urlValidator from "../validators/url";
import emailValidator from "../validators/email";
import passwordValidator from "../validators/password";

// constants
import { MAX_ABOUT_LENGTH, MAX_NAME_LENGTH, MIN_ABOUT_LENGTH, MIN_NAME_LENGTH } from "../utils/constants";



const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: false,
    default: "Жак-Ив Кусто",
    minlength: MIN_NAME_LENGTH,
    maxlength: MAX_NAME_LENGTH
  },
  about: {
    type: String,
    required: false,
    default: "Исследователь",
    minlength: MIN_ABOUT_LENGTH,
    maxlength: MAX_ABOUT_LENGTH
  },
  avatar: {
    type: String,
    required: false,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: urlValidator
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: emailValidator
  },
  password: {
    type: String,
    required: true,
    validate: passwordValidator
  }
});

const UserModel = model<UserInterface>("user", UserSchema);

export default UserModel;
