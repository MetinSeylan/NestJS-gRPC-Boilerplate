import { AnySchema } from 'joi';
import { UsePipes } from '@nestjs/common';
import { ValidatePipe } from './validate.pipe';

export const Validate = (schema: AnySchema) =>
  UsePipes(new ValidatePipe(schema));
