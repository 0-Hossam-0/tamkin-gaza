import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { createHmac } from 'node:crypto';

@Injectable()
export class HashingService {
  constructor(private configService: ConfigService) { }


  generateHash = async (
    {
      text,
      salt = process.env.HASH_SALT ? parseInt(process.env.HASH_SALT) : 10
    }: {
      text: string,
      salt?: number
    }
  ) => {
    return await bcrypt.hash(text, salt || 10);
  }

  compareHash = async ({ plainText, hashText }: {
    plainText: string,
    hashText: string
  }) => {
    return await bcrypt.compare(plainText, hashText)
  }

  hashEmail = (email: string) => {
    const secret = process.env.EMAIL_HASH_SECRET;
    if (!secret) throw new Error('EMAIL_HASH_SECRET is not set');
    return createHmac('sha256', secret).update(email).digest('hex')
  }

  hashToken = (token: string) => {
    const secret = process.env.TOKEN_HASH_SECRET;
    if (!secret) throw new Error("TOKEN_HASH_SECRET is not set");

    return createHmac("sha256", secret)
      .update(token)
      .digest("hex");
  }



}