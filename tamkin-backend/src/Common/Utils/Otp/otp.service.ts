import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpModel } from 'src/DataBase/Models/otp.model';
import { OTPStatusEnum, OTPTypeEnum } from 'src/Common/Enums/Otp/otp.enum';
import { EmailService } from '../Email/email.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { HashingService } from 'src/Common/Services/Security/Hash/hash.service';

type TFunction = (key: string) => string;

@Injectable()
export class OTPService {

  constructor(
    private readonly responseService: ResponseService,
    private readonly emailService: EmailService,
    private readonly hashingService: HashingService,
    @InjectRepository(OtpModel)
    private readonly otpRepository: Repository<OtpModel>,
  ) { }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private generateCode(): string {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
  }

  private async checkRequestExists({
    userId,
    type,
  }: {
    userId: number;
    type: OTPTypeEnum;
  }) {

    const otp = await this.otpRepository.findOne({
      where: {
        userId,
        type,
        status: OTPStatusEnum.ACTIVE,
      }
    }); return otp ? otp : false;

  }

  async sendOTP({
    userId,
    email,
    userName,
    type,
    t,
  }: {
    userId: number;
    email: string;
    userName: string;
    type: OTPTypeEnum;
    t: TFunction;
  }) {


    const requestExists = await this.checkRequestExists({ userId, type });

    if (requestExists) {

      // 1. لو لسه blocked
      if (requestExists.blockedUntil && requestExists.blockedUntil.getTime() > Date.now()) {
        throw this.responseService.badRequest({
          message: t('auth:errors.confirmEmailOTPBlocked'),
          info: t('auth:errors.confirmEmailOTPBlockedInfo'),
        });
      }

      // 2. limit
      if (requestExists.resendCount >= 3) {
        throw this.responseService.badRequest({
          message: t('auth:errors.otpTooManyRequests'),
          info: t('auth:errors.otpTooManyRequestsInfo'),
        });
      }

      // 3. update نفس الـ OTP
      const otpCode = this.generateCode();

      requestExists.code = await this.hashingService.generateHash({text: otpCode});
      requestExists.expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      requestExists.resendCount += 1;
      requestExists.blockedUntil = new Date(Date.now() + 1 * 60 * 1000);

      await this.otpRepository.save(requestExists);

      await this.emailService.sendOtpEmail({
        email,
        userName,
        OTP: otpCode,
        type,
        t,
      });

      return true;
    }

    // أول مرة
    const otpCode = this.generateCode();

    const newOtp = this.otpRepository.create({
      userId,
      code: await this.hashingService.generateHash({text: otpCode}),
      type,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      status: OTPStatusEnum.ACTIVE,
      resendCount: 0,
      blockedUntil: new Date(Date.now() + 1 * 60 * 1000),
      deleteIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await this.otpRepository.save(newOtp);

    const emailSent = await this.emailService.sendOtpEmail({
      email,
      userName,
      OTP: otpCode,
      type,
      t,
    });

    if (!emailSent) {

      await this.otpRepository.delete(newOtp);

      throw this.responseService.serverError({
        message: t('email:errors.failToSendEmail'),
        info: t('email:errors.failToSendEmailInfo'),
      })
    }

    return true;

  }


  async verifyOTP({
    userId,
    code,
    type,
    t,
  }: {
    userId: number;
    code: string;
    type: OTPTypeEnum;
    t: TFunction;
  }) {

    const otp = await this.checkRequestExists({ userId, type });

    if (!otp) {
      throw this.responseService.badRequest({
        message: t('auth:errors.otpInvalid'),
        info: t('auth:errors.otpInvalidInfo')
      });
    }

    const isCodeValid = await this.hashingService.compareHash({hashText: otp.code, plainText: code});

    if (!isCodeValid) {
      throw this.responseService.badRequest({
        message: t('auth:errors.otpInvalid'),
        info: t('auth:errors.otpInvalidInfo')
      });
    }

    otp.status = OTPStatusEnum.USED;
    await this.otpRepository.save(otp);

    return true;

  }

}