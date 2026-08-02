import { IsEmail, IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { UserProviderEnum, UserRoleEnum } from 'src/Common/Enums/User/user.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsEnum(UserProviderEnum)
  provider?: UserProviderEnum;

  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;
}