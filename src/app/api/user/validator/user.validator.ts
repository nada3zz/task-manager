import Joi from "joi";
import { escape } from "validator";

const sanitizedString = Joi.string().custom((value: string, helpers) => {
  const sanitizedValue = escape(value);
  return sanitizedValue;
});

const auth: any = {
  username: sanitizedString.required(),
  password: sanitizedString
    .min(8)
    .pattern(
      new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])")
    )
    .required(),
};

export const userValidation = auth;

