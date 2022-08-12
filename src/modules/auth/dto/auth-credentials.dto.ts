import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'email.required' })
  @IsEmail({}, { message: 'email.email' })
  email: string;

  @IsNotEmpty({ message: 'password.required' })
  password: string;
}
