import { SetMetadata } from '@nestjs/common';
import { TokenTypeEnum } from '../../Enums/token.enum';

export const SetTokenType = (
  tokenType: TokenTypeEnum = TokenTypeEnum.ACCESS,
) => {
  return SetMetadata('tokenType', tokenType);
};
