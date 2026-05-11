import { OTPTypeEnum } from 'src/Common/Enums/Otp/otp.enum';

export type MailType = OTPTypeEnum;

export interface IOtpContext {
  OTP: string;
}
