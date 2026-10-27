import { IsString, IsNotEmpty } from 'class-validator';
//DTOs Defines the expected data structure.
export class CreateUserDto {
  @IsString()//defines the validations rules this decorators
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}