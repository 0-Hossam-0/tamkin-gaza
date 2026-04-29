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
