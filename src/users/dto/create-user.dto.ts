import { IsString, IsNotEmpty } from 'class-validator';
//DTOs Defines the expected data structure.
export class CreateUserDto {
  @IsString()//defines the validations rules this decorators
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;


  @IsString()
  @IsNotEmpty()
  role: string;
}