import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import {
  BrowserEnum,
  DeviceTypeEnum,
  OSEnum,
} from 'src/Common/Enums/Jwt/jwt.enum';
import { ISession } from 'src/Common/Interfaces/Security/client-info.interface';
import { IRequest } from 'src/Common/Types/request.types';

import { UAParser } from 'ua-parser-js';

@Injectable()
export class ClientInfoService {
  private parseDeviceInfo(userAgent: string) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // Device Type
    let type = DeviceTypeEnum.DESKTOP;
    if (result.device.type === 'mobile') type = DeviceTypeEnum.MOBILE;
    if (result.device.type === 'tablet') type = DeviceTypeEnum.TABLET;

    // OS
    let os: OSEnum;
    switch (result.os.name) {
      case 'Windows':
        os = OSEnum.WINDOWS;
        break;
      case 'Mac OS':
        os = OSEnum.MAC_OS;
        break;
      case 'Android':
        os = OSEnum.ANDROID;
        break;
      case 'iOS':
        os = OSEnum.IOS;
        break;
      default:
        os = OSEnum.LINUX;
    }

    // Browser
    let browser: BrowserEnum;
    switch (result.browser.name) {
      case 'Firefox':
        browser = BrowserEnum.FIREFOX;
        break;
      case 'Safari':
        browser = BrowserEnum.SAFARI;
        break;
      case 'Edge':
        browser = BrowserEnum.EDGE;
        break;
      default:
        browser = BrowserEnum.CHROME; // Chromium-based
    }

    return {
      type,
      os,
      browser,
    };
  }

  getUserSessionContext(req: Request | IRequest): ISession {
    const userAgent = req.headers['user-agent'] || 'unknown';

    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req as Request).socket.remoteAddress ||
      'unknown';

    const deviceInfo = this.parseDeviceInfo(userAgent);

    return {
      deviceInfo,
      ipAddress,
      userAgent,
    };
  }
}
