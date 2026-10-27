import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class RoleValidationPipe implements PipeTransform {
  transform(value: string) {
    const allowedRoles = ['admin', 'developer', 'user'];

    if (!allowedRoles.includes(value)) {
      throw new BadRequestException(
        `Invalid role: ${value}`,
      );
    }

    return value;
  }
}