import { OTPStatusEnum, OTPTypeEnum } from "src/Common/Enums/Otp/otp.enum";
import { I_OTP } from "src/Common/Interfaces/Otp/otp.interface";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity()
@Index(["userId", "type"])
export class OtpModel implements I_OTP {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    userId: number;

    @Column()
    code: string;

    @Column({ enum: OTPTypeEnum })
    type: OTPTypeEnum;

    @Column({ enum: OTPStatusEnum, default: OTPStatusEnum.ACTIVE })
    status: OTPStatusEnum;

    @Column({ type: "timestamp" })
    expiresAt: Date;

    @Column({ nullable: true })
    usedAt?: Date;

    @Column({ default: 0 })
    attemptsCount: number;

    @Column({ nullable: true })
    blockedUntil?: Date;

    @Column({ default: 0 })
    resendCount: number;

    @Column({ type: "timestamp", nullable: true })
    resendAvailableAt?: Date;

    @Column({
        type: "timestamp"
    })
    deleteIn: Date;
}