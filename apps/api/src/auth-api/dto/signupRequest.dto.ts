import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
