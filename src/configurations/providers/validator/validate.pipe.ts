import { PipeTransform } from '@nestjs/common';
import { AnySchema, ValidationOptions } from 'joi';
import { InvalidArgumentException } from '../../exceptions/invalid-argument.exception';

export class ValidatePipe implements PipeTransform {
  constructor(private schema: AnySchema, private options?: ValidationOptions) {}

  transform(payload: any) {
    if (
      typeof payload === 'object' &&
      payload.request &&
      typeof payload.request === 'object'
    ) {
      const { error } = this.schema.validate(payload.request, this.options);
      if (error) {
        throw new InvalidArgumentException();
      }
    }
    return payload;
  }
}
