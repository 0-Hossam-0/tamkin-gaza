import { E_SignatureLevel } from "../Enums/signature.level.enum";
import { E_TokenType } from "../Enums/token.enum";
import { E_UserRole } from "../Enums/user.enums";


export interface I_SignToken {
  payload: {
    userId:  string;
    role: E_UserRole | string;
    signature: E_SignatureLevel ;
  };
  tokenType: E_TokenType;
}

export interface I_Decoded {
  userId: string;
  role: E_UserRole | string;
  iat: number;
  exp: number;
  jti: string;
}