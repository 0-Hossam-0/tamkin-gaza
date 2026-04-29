import { Response } from 'express';
import { TokenTypeEnum } from 'src/Common/Enums/token.enum';

export class CookiesService {
  constructor() {}

  private toNumber = (value: any, fallback: number) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
  };

  setTokenToCookies(res: Response, token: string, type: TokenTypeEnum) {
    const isAccess = type === TokenTypeEnum.ACCESS;

    const name = isAccess ? 'access_token' : 'refresh_token';

    const ACCESS_TOKEN_IN_COOKIES =
      process.env.NODE_ENV === 'development'
        ? this.toNumber(process.env.ACCESS_TOKEN_IN_COOKIES_DEV_MOOD, 86400000)
        : this.toNumber(process.env.ACCESS_TOKEN_IN_COOKIES, 3600000);

    const REFRESH_TOKEN_IN_COOKIES = this.toNumber(
      process.env.REFRESH_TOKEN_IN_COOKIES,
      604800000,
    );

    const maxAge = isAccess
      ? ACCESS_TOKEN_IN_COOKIES
      : REFRESH_TOKEN_IN_COOKIES;

    res.cookie(name, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge,
    });
  }

  removeTokenFromCookies(res: Response, type: TokenTypeEnum) {
    const isAccess = type === TokenTypeEnum.ACCESS;

    const name = isAccess ? 'access_token' : 'refresh_token';

    res.clearCookie(name, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  }
}
