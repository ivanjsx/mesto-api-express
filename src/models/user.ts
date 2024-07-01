// libraries
import bcrypt from "bcryptjs";
import { model, Model, Schema, Document } from "mongoose";

// interfaces
import UserInterface from "../interfaces/user";

// validators
import urlValidator from "../validators/url";
import emailValidator from "../validators/email";

// constants
import { MAX_ABOUT_LENGTH, MAX_NAME_LENGTH, MIN_ABOUT_LENGTH, MIN_NAME_LENGTH } from "../utils/constants";



interface UserModelInterface extends Model<UserInterface> {
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, object, UserInterface>>
};

const UserSchema = new Schema<UserInterface, UserModelInterface>({
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
    index: true,
    type: String,
    unique: true,
    required: true,
    validate: emailValidator
  },
  password: {
    type: String,
    select: false,
    required: true
  }
});

UserSchema.static(
  "findUserByCredentials", function (email: string, password: string) {
    return this.findOne({ email }).select("+password").then(
      (user) => {
        if (!user) {
          return Promise.reject(new Error("Неправильные почта или пароль"));
        };
        return bcrypt.compare(password, user.password).then(
          (matched) => {
            if (!matched) {
              return Promise.reject(new Error("Неправильные почта или пароль"));
            };
            return user;
          }
        );
      }
    );
  }
);

const UserModel = model<UserInterface, UserModelInterface>("user", UserSchema);

export default UserModel;
