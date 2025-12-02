import Joi from "joi";
import { escape } from "validator";

const sanitizedString: any = Joi.string().custom((value, helpers) => {
  const sanitizedValue = escape(value);
  return sanitizedValue;
});

const add: any = {
  title: sanitizedString.required(),
  description: sanitizedString.required(),
};

const edit: any = {
  id: Joi.number().integer().required(),
  title: sanitizedString.optional(),
  description: sanitizedString.optional(),
};

const getDetailsSchema: any = {
  id: Joi.number().integer().required(),
};

const deleteSchema: any = {
  id: Joi.number().integer().required(),
};

const taskValidation = {
  add,
  edit,
  getDetailsSchema,
  delete: deleteSchema,
};

export { taskValidation };
