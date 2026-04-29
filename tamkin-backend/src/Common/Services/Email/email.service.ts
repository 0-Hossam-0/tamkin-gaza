import { Injectable, Logger } from '@nestjs/common';
import { getTransporter } from './Config/email.config';
import { E_EmailSubject } from './email.subjects';
import {
  confirmEmailTemplate,
  disableTwoFATemplate,
  enableTwoFATemplate,
  loginOtpTemplate,
  resetPasswordOtpTemplate,
  updateEmailOtpTemplate,
} from './email.templates';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { OTPTypeEnum } from 'src/Common/Enums/Otp/otp.enum';
import { TranslationService } from '../Translation/translation.service';


@Injectable()
export class EmailService {

  constructor(private readonly error: ResponseService ,
    private readonly translationService: TranslationService,
  ) { }

  private async sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    
    let transporter: ReturnType<typeof getTransporter>;

    try {
      transporter = getTransporter();
    } catch {
        throw this.error.serverError({
          message: this.translationService.translate('email:errors.email_config_missing'),
          info: this.translationService.translate('email:errors.email_config_missing_info'),
        });
    }

    try {
      return await transporter.sendMail({
        from: `"${process.env.APP_NAME}" <${process.env.APP_EMAIL}>`,
        to,
        subject,
        html,
      });
    } catch (sendError: any) {
        throw this.error.serverError({
          message: this.translationService.translate('email:errors.fail_to_send_email'),
          info: this.translationService.translate('email:errors.fail_to_send_email_info'),
        });
    }
  }

  async sendOtpEmail({
    email,
    userName,
    OTP,
    type,

  }: {
    email: string;
    userName: string;
    OTP: string;
    type: OTPTypeEnum;
  }) {
    const templates: Record<OTPTypeEnum, { subject: string; html: string }> = {
      [OTPTypeEnum.CONFIRM_EMAIL]: {
        subject: E_EmailSubject.CONFIRM_EMAIL,
        html: confirmEmailTemplate({ userName, OTP }),
      },
      [OTPTypeEnum.RESET_PASSWORD]: {
        subject: E_EmailSubject.RESET_PASSWORD,
        html: resetPasswordOtpTemplate({ userName, OTP }),
      },
      [OTPTypeEnum.LOGIN_OTP]: {
        subject: E_EmailSubject.LOGIN_OTP,
        html: loginOtpTemplate({ userName, OTP }),
      },
      [OTPTypeEnum.ENABLE_2FA]: {
        subject: E_EmailSubject.ENABLE_2FA,
        html: enableTwoFATemplate({ userName, OTP }),
      },
      [OTPTypeEnum.DISABLE_2FA]: {
        subject: E_EmailSubject.DISABLE_2FA,
        html: disableTwoFATemplate({ userName, OTP }),
      },
      [OTPTypeEnum.UPDATE_EMAIL]: {
        subject: E_EmailSubject.UPDATE_EMAIL,
        html: updateEmailOtpTemplate({ userName, OTP }),
      },
    };

    const { subject, html } = templates[type];
    await this.sendEmail({ to: email, subject, html });

    return true;
  }
}