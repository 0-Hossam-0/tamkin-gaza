import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankTransferModel } from 'src/DataBase/Models/bank-transfer.model';
import { BankTransferReceiptModel } from 'src/DataBase/Models/bank-transfer-receipt.model';
import { MinioService } from 'src/Common/Minio/minio.service';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { UpdateBankTransferDto } from './Dtos/update-bank-transfer.dto';
import { CreateBankTransferReceiptDto } from './Dtos/create-bank-transfer-receipt.dto';
import { seedBankTransferIfEmpty } from 'src/DataBase/seed';

@Injectable()
export class BankTransferService implements OnModuleInit {
  private readonly logger = new Logger(BankTransferService.name);

  constructor(
    @InjectRepository(BankTransferModel)
    private readonly bankTransferRepository: Repository<BankTransferModel>,
    @InjectRepository(BankTransferReceiptModel)
    private readonly receiptRepository: Repository<BankTransferReceiptModel>,
    private readonly configService: ConfigService,
    private readonly minioService: MinioService,
    private readonly responseService: ResponseService,
  ) {}

  async onModuleInit() {
    if (process.env.SKIP_SEED) {
      return;
    }

    try {
      await seedBankTransferIfEmpty(this.bankTransferRepository, this.configService);
    } catch (err) {
      this.logger.error('Failed to seed bank transfer info on module init:', err);
    }
  }

  async getActiveBankTransfer(): Promise<BankTransferModel> {
    const bankTransfer = await this.bankTransferRepository.findOne({
      where: { isActive: true },
    });

    if (!bankTransfer) {
      this.responseService.notFound({ message: 'payment.errors.bank_transfer_not_found' });
    }

    return bankTransfer!;
  }

  async upsertBankTransfer(
    dto: UpdateBankTransferDto,
    image?: Express.Multer.File,
  ): Promise<BankTransferModel> {
    let bankTransfer = await this.bankTransferRepository.findOne({
      where: { isActive: true },
    });

    if (!bankTransfer) {
      bankTransfer = this.bankTransferRepository.create();
    }

    if (dto.accountName !== undefined) bankTransfer.accountName = dto.accountName;
    if (dto.bankName !== undefined) bankTransfer.bankName = dto.bankName;
    if (dto.branch !== undefined) bankTransfer.branch = dto.branch;
    if (dto.swiftCode !== undefined) bankTransfer.swiftCode = dto.swiftCode;
    if (dto.accountNo !== undefined) bankTransfer.accountNo = dto.accountNo;
    if (dto.ibans !== undefined) bankTransfer.ibans = dto.ibans;
    if (dto.isActive !== undefined) bankTransfer.isActive = dto.isActive;

    if (image) {
      if (bankTransfer.imageName) {
        await this.minioService.deleteFile(bankTransfer.imageName).catch(() => {
          this.logger.warn(`Failed to delete old image: ${bankTransfer.imageName}`);
        });
      }
      const { fileName, fileUrl } = await this.minioService.uploadFile(image);
      bankTransfer.image = fileUrl;
      bankTransfer.imageName = fileName;
    }

    return this.bankTransferRepository.save(bankTransfer);
  }

  async createReceipt(
    dto: CreateBankTransferReceiptDto,
    image: Express.Multer.File,
    userUuid?: string,
  ): Promise<BankTransferReceiptModel> {
    const { fileName, fileUrl } = await this.minioService.uploadFile(image);

    const receipt = this.receiptRepository.create({
      fullName: dto.fullName,
      amount: dto.amount,
      notes: dto.notes,
      image: fileUrl,
      imageName: fileName,
      userUuid,
    });

    return this.receiptRepository.save(receipt);
  }
}
