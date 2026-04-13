import { SetMetadata } from "@nestjs/common"
import { E_TokenType } from "../Enums/token.enum";

export const SetTokenType = (tokenType: E_TokenType = E_TokenType.ACCESS) => {
    return SetMetadata("tokenType", tokenType);
}