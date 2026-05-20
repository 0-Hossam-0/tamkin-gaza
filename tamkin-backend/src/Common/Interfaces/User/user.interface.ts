/* export interface I_UserActions {
    freezedAt?: Date;
    freezedBy?: string;
    freezedReason?: string;
    freezedUntil?: Date;
    freezedCount?: number;

    unFreezedAt?: Date;
    unFreezedBy?: string;

    bannedAt?: Date;
    bannedBy?: string;
    bannedReason?: string;
    bannedUntil?: Date;
    bannedCount?: number;

    unBannedAt?: Date;
    unBannedBy?: string;
} */

import {
  UserProviderEnum,
  UserRoleEnum,
} from 'src/Common/Enums/User/user.enum';

export interface IUser {
  _id: number;
  uuid: string;

  firstName: string;
  lastName: string;

  fullName: string;

  email: string;

  emailVerified: boolean;

  provider: UserProviderEnum;

  password?: string;

  nationality?: string;

  picture?: string;

  role: UserRoleEnum;

  createdAt: Date;
  updatedAt: Date;
}


type deviceData = {
  userId: string;
  deviceToken?: string;
  ip?: string | null | undefined;
  os?: string | null | undefined;
  country?: string | null | undefined;
  countryCode?: string | null | undefined;
  city?: string | null | undefined;
  countryImage?: string | null | undefined;
  callingCode?: string | null | undefined;
  userAgent?: string | null | undefined;
  latitude?: string | null | undefined;
  longitude?: string | null | undefined;
};
type TIpData = {
  ip: string;
  country: string | null;
  timezone: string | null;
  city: string | null;
  countryCode: string | null;
  countryCode3: string | null;
  currency: string | null;
  callingCode: string | null;
  flag: string | null;
  isp: string | null;
};

type TUserAgentData = {
  userAgent: string;
  browserName: string | null;
  deviceName: string | null;
  deviceVendor: string | null;
  os: string | null;
  osVesrsion: string | null;
  browserVersion: string | null;
};

export type { deviceData, TIpData, TUserAgentData };
