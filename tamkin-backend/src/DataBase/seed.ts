import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { HashingService } from '../Common/Services/Security/Hash/hash.service';
import { UserModel } from './Models/user.model';
import { ReelModel } from './Models/reel.model';
import { PaymentModel } from './Payment/payment.model';
import { UserRoleEnum, UserProviderEnum } from '../Common/Enums/User/user.enum';
import { CampaignStatusEnum } from '../Modules/Campaign/Enums/campaign-status.enum';
import { PaymentStatusEnum } from '../Modules/Payment/Enums/payment-status.enum';
import { PaymentProviderEnum } from '../Modules/Payment/Enums/payment-provider.enum';
import { faker } from '@faker-js/faker';
import { CampaignModel } from './Models/campaign.model';

export async function ensureAdmin(dataSource: DataSource, hashingService: HashingService) {
  const userRepository = dataSource.getRepository(UserModel);
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@tamkin.com';
  let admin = await userRepository.findOne({ where: { email: adminEmail } });
  if (!admin) {
    console.log('Creating Admin User...');
    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'AdminPassword123!';
    admin = userRepository.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: adminEmail,
      emailVerified: true,
      provider: UserProviderEnum.SYSTEM,
      password: await hashingService.generateHash({ text: adminPassword }),
      role: UserRoleEnum.SUPER_ADMIN,
    });
    await userRepository.save(admin);
  } else {
    console.log('Admin User already exists. Skipping...');
  }
}

export async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);
  const hashingService = app.get(HashingService);

  const userRepository = dataSource.getRepository(UserModel);
  const campaignRepository = dataSource.getRepository(CampaignModel);
  const reelRepository = dataSource.getRepository(ReelModel);
  const paymentRepository = dataSource.getRepository(PaymentModel);

  console.log('🌱 Starting database seeding...');

  // 1. Ensure admin exists
  await ensureAdmin(dataSource, hashingService);

  // 2. Seed Users
  console.log('Creating regular users...');
  const users: UserModel[] = [];
  // Collect existing emails to avoid unique constraint violations
  const existingUsers = await userRepository.find({ select: ['email'] });
  const existingEmails = new Set(existingUsers.map((u) => u.email?.toLowerCase()));

  let createdCount = 0;
  while (createdCount < 10) {
    const generatedEmail = faker.internet.email().toLowerCase();
    if (existingEmails.has(generatedEmail)) {
      // collision, try again
      continue;
    }

    const user = userRepository.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: generatedEmail,
      emailVerified: true,
      provider: UserProviderEnum.SYSTEM,
      password: await hashingService.generateHash({ text: 'UserPassword123!' }),
      role: UserRoleEnum.USER,
    });

    try {
      const saved = await userRepository.save(user);
      users.push(saved);
      existingEmails.add(generatedEmail);
      createdCount++;
    } catch (err: any) {
      // If a duplicate slipped through due to race condition, skip and continue
      console.warn(
        'Warning: failed to save user (possible duplicate), retrying...',
        err?.message ?? err,
      );
      continue;
    }
  }

  // 3. Seed Campaigns
  console.log('Creating campaigns...');
  const campaigns: CampaignModel[] = [];
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
    // PaymentProviderEnum.STRIPE,
    // PaymentProviderEnum.PAYMOB,
    // PaymentProviderEnum.FAWRY,
    PaymentProviderEnum.IYZICO,
  ];
  const pStatuses = [
    PaymentStatusEnum.PENDING,
    PaymentStatusEnum.SUCCEEDED,
    PaymentStatusEnum.FAILED,
  ];

  for (let i = 0; i < 20; i++) {
    const payment = paymentRepository.create({
      targetType: 'campaign',
      targetUuid: faker.helpers.arrayElement(campaigns).uuid,
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

// If this file is executed directly (via `ts-node src/DataBase/seed.ts`),
// set a flag so that when we create an application context with AppModule
// the module's bootstrap won't re-run the seeder and cause recursion.
declare const require: any;
if (typeof require !== 'undefined' && require.main === module) {
  process.env.SKIP_SEED = '1';
  seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}
