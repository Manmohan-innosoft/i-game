import { Type } from 'class-transformer';
import { IsInt, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;
}