import { IDeviceInfo } from "../Jwt/jwt.interface";

export interface ISession {
  deviceInfo: IDeviceInfo;
  ipAddress: string;
  userAgent: string;
}
