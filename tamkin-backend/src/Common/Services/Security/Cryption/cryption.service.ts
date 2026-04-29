import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly ivLength = 16;
  private readonly key: Buffer;

  constructor(private configService: ConfigService) {
    const cryptoKey = this.configService.get<string>('CRYPTO_KEY');

    if (!cryptoKey) {
      throw new InternalServerErrorException(
        'CRYPTO_KEY is missing in environment variables',
      );
    }

    this.key = crypto.scryptSync(cryptoKey, 'salt', 32);
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(cipherText: string): string {
    const [ivHex, encryptedHex] = cipherText.split(':');

    if (!ivHex || !encryptedHex) {
      throw new InternalServerErrorException('Invalid encrypted text format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);

    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString('utf8');
  }
}
