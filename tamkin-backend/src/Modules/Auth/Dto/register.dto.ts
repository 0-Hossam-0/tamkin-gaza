import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { UserValidators } from 'src/Common/Validators/user.validate';

export class GoogleLoginDto {
  @IsString({ message: 'validation.global.is_string' })
  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  id_token: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'validation.global.is_email' })
  @IsString({ message: 'validation.global.is_string' })
  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  email: string;

  @IsString({ message: 'validation.global.is_string' })
  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  password: string;
}

export class RegisterDto extends PickType(UserValidators, [
  'fullName',
  'password',
  'confirmPassword',
  'email',
  'nationality',
]) {}
