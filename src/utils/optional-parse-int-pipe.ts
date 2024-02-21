import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe
  implements PipeTransform<string | undefined, number | undefined>
{
  transform(value: string | undefined) {
    if (value === undefined) {
      return undefined; // Return undefined if value is not provided
    }
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }
    return parsedValue;
  }
}
