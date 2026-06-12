import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { HashingService } from '../Common/Services/Security/Hash/hash.service';
import { UserModel } from './Models/user.model';
import { Campaign } from './Campaign/campaign.model';
import { ReelModel } from './Models/reel.model';
import { Payment } from './Payment/payment.model';
import { UserRoleEnum, UserProviderEnum } from '../Common/Enums/User/user.enum';
import { CampaignStatusEnum } from '../Modules/Campaign/Enums/campaign-status.enum';
import { PaymentStatusEnum } from '../Modules/Payment/Enums/payment-status.enum';
import { PaymentProviderEnum } from '../Modules/Payment/Enums/payment-provider.enum';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const hashingService = app.get(HashingService);

  const userRepository = dataSource.getRepository(UserModel);
  const campaignRepository = dataSource.getRepository(Campaign);
  const reelRepository = dataSource.getRepository(ReelModel);
  const paymentRepository = dataSource.getRepository(Payment);

  console.log('🌱 Starting database seeding...');

  // 1. Seed Admin
  const adminEmail = 'admin@tamkin.com';
  let admin = await userRepository.findOne({ where: { email: adminEmail } });
  if (!admin) {
    console.log('Creating Admin User...');
    admin = userRepository.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: adminEmail,
      emailVerified: true,
      provider: UserProviderEnum.SYSTEM,
      password: await hashingService.generateHash({ text: 'AdminPassword123!' }),
      role: UserRoleEnum.SUPER_ADMIN,
    });
    await userRepository.save(admin);
  } else {
    console.log('Admin User already exists. Skipping...');
  }

  // 2. Seed Users
  console.log('Creating regular users...');
  const users: UserModel[] = [];
  for (let i = 0; i < 10; i++) {
    const user = userRepository.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      emailVerified: true,
      provider: UserProviderEnum.SYSTEM,
      password: await hashingService.generateHash({ text: 'UserPassword123!' }),
      role: UserRoleEnum.USER,
    });
    users.push(await userRepository.save(user));
  }

  // 3. Seed Campaigns
  console.log('Creating campaigns...');
  const campaigns: Campaign[] = [];
  const statuses = [
    CampaignStatusEnum.DRAFT,
    CampaignStatusEnum.ACTIVE,
    CampaignStatusEnum.COMPLETED,
    CampaignStatusEnum.CANCELLED,
  ];
  for (let i = 0; i < 5; i++) {
    const targetAmount = parseFloat(faker.finance.amount({ min: 1000, max: 100000, dec: 2 }));
    const currentAmount = parseFloat(faker.finance.amount({ min: 0, max: targetAmount, dec: 2 }));

    const campaign = campaignRepository.create({
      title: {
        en: faker.lorem.words(3),
        ar: `حملة ${faker.lorem.word()}`,
        tr: `Kampanya ${faker.lorem.word()}`,
        ur: `مہم ${faker.lorem.word()}`,
      },
      description: {
        en: faker.lorem.paragraph(),
        ar: `وصف الحملة ${faker.lorem.words(5)}`,
        tr: `Kampanya açıklaması ${faker.lorem.words(5)}`,
        ur: `مہم کی تفصیل ${faker.lorem.words(5)}`,
      },
      target_amount: targetAmount,
      current_amount: currentAmount,
      slug: faker.helpers.slugify(faker.lorem.words(3).toLowerCase()) + '-' + Date.now() + i,
      image: [faker.image.url()],
      status: faker.helpers.arrayElement(statuses),
    });
    campaigns.push(await campaignRepository.save(campaign));
  }

  // 4. Seed Reels
  console.log('Creating reels...');
  for (let i = 0; i < 15; i++) {
    const reel = reelRepository.create({
      fileName: `video_${i}.mp4`,
      fileUrl: faker.internet.url(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      user: faker.helpers.arrayElement(users),
    });
    await reelRepository.save(reel);
  }

  // 5. Seed Payments
  console.log('Creating payments...');
  const providers = [
    PaymentProviderEnum.STRIPE,
    PaymentProviderEnum.PAYMOB,
    PaymentProviderEnum.FAWRY,
  ];
  const pStatuses = [
    PaymentStatusEnum.PENDING,
    PaymentStatusEnum.SUCCEEDED,
    PaymentStatusEnum.FAILED,
  ];

  for (let i = 0; i < 20; i++) {
    const payment = paymentRepository.create({
      campaign: faker.helpers.arrayElement(campaigns),
      user: faker.helpers.arrayElement([...users, undefined]), // Some anonymous payments
      amount: parseFloat(faker.finance.amount({ min: 10, max: 1000, dec: 2 })),
      currency: 'USD',
      status: faker.helpers.arrayElement(pStatuses),
      provider: faker.helpers.arrayElement(providers),
      providerPaymentId: faker.string.uuid(),
    });
    await paymentRepository.save(payment);
  }

  console.log('✅ Database seeding completed successfully!');
  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
