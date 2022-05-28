import * as Joi from 'joi';

export const UserCreateValidator = Joi.object({
  name: Joi.string().min(3).required(),
});
