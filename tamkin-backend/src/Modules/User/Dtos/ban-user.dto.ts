import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class BanUserDto {
  @IsBoolean()
  isBanned: boolean;

  @IsOptional()
  @IsString()
  reason?: string;
}