import { SignatureLevelEnum } from '../Enums/User/signature.level.enum';
import { TokenTypeEnum } from '../Enums/token.enum';
import { UserRoleEnum } from '../Enums/User/user.enum';

export interface ISignToken {
  payload: {
    userId: string;
    role: UserRoleEnum | string;
    signature: SignatureLevelEnum;
  };
  tokenType: TokenTypeEnum;
}

export interface IDecoded {
  userId: string;
  role: UserRoleEnum | string;
  iat: number;
  exp: number;
  jti: string;
}
