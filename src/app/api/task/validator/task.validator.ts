import Joi from "joi";
import { escape } from "validator";

const sanitizedString = Joi.string().custom((value, helpers) => escape(value));

const add: any = {
  title: sanitizedString.required(),
  description: sanitizedString.required(),
  completed: Joi.boolean().optional(),
};

const edit: any = {
  id: Joi.string().required(),
  title: sanitizedString.optional(),
  description: sanitizedString.optional(),
  completed:Joi.boolean().optional()
};

const getDetailsSchema: any = {
  id: Joi.string().required(),
};

const deleteSchema: any = {
  id: Joi.string().required(),
};

const taskValidation = {
  add,
  edit,
  getDetailsSchema,
  delete: deleteSchema,
};

export { taskValidation };
