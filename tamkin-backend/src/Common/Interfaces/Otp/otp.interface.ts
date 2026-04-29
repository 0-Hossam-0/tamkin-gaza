import { OTPStatusEnum, OTPTypeEnum } from "src/Common/Enums/Otp/otp.enum";

export interface I_OTP {

    userId: number;

    code: string; // 6 characters hashed

    type: OTPTypeEnum;

    status: OTPStatusEnum;

    expiresAt: Date; // 15 minutes

    usedAt?: Date;

    attemptsCount: number; // max 3 times

    blockedUntil?: Date; // 1 hour

    resendCount: number; // max 3 resends per hour

    resendAvailableAt?: Date; // cooldown between resends

    deleteIn: Date; // 1 day of creation
}