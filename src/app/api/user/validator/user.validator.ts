import Joi from "joi";
import { escape } from "validator";

const sanitizedString = Joi.string().custom((value, helpers) => escape(value));

const register: any = {
  fullName: sanitizedString.required(),
  username: sanitizedString.required(),
  password: sanitizedString
    .min(8)
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])")
    )
    .required(),
};

const login: any = {
  username: sanitizedString.required(),
  password: sanitizedString
    .min(8)
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])")
    )
    .required(),
};

export const userValidation = { register, login};

