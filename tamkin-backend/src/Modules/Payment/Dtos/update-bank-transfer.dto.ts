import { Transform } from 'class-transformer';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

function parseBoolean(value: unknown): boolean | undefined {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }
  return undefined;
}

function parseObject(value: unknown): Record<string, string> | undefined {
  if (value === undefined || value === null || value === '') return undefined;

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? (parsed as Record<string, string>)
        : undefined;
    } catch {
      return undefined;
    }
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, string>;
  }

  return undefined;
}

export class UpdateBankTransferDto {
  @IsString()
  accountName: string;

  @IsString()
  bankName: string;

  @IsString()
  branch: string;

  @IsString()
  swiftCode: string;

  @IsString()
  accountNo: string;

  @Transform(({ value }) => parseObject(value))
  @IsObject()
  ibans: Record<string, string>;

  @Transform(({ value }) => parseBoolean(value))
  @IsBoolean()
  isActive: boolean;
}
