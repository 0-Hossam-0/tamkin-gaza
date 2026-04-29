import { BrowserEnum, DeviceTypeEnum, OSEnum } from 'src/Common/Enums/Jwt/jwt.enum';
import { TokenTypeEnum } from 'src/Common/Enums/token.enum';

export interface IDeviceInfo {
  type: DeviceTypeEnum;
  os: OSEnum;
  browser: BrowserEnum;
}

export interface IJwt {
  _id: string;

  userId?: string;

  jti: string;

  token: string;

  type: TokenTypeEnum;

  expiresAt: Date;

  revoked: boolean;

  revokedAt?: Date;

  deviceInfo: IDeviceInfo;

  ipAddress: string;

  userAgent: string;

  createdAt: Date;

  updatedAt: Date;
}
