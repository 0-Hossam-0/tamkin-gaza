import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserValidators } from '../../../Common/Validators/user.validate';

export class GoogleLoginDto {
  @IsString({ message: 'validation.global.is_string' })
  @IsNotEmpty({ message: 'validation.global.is_not_empty' })
  id_token: string;
}

export class LoginDto extends PickType(UserValidators, ['email', 'password']) {}

export class RegisterDto extends PickType(UserValidators, [
  'fullName',
  'password',
  'confirmPassword',
  'email',
  'nationality',
]) {}
