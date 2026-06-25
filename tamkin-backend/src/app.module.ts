import { MiddlewareConsumer, Module, OnApplicationBootstrap, RequestMethod } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { HashingService } from './Common/Services/Security/Hash/hash.service';
import { AuthModule } from './Modules/Auth/auth.module';
import { CommonModule } from './Common/common.module';
import { CsrfMiddleware } from './Common/Middleware/csrf.middleware';
import { TypeORMConfig } from './Config/typeorm.config';
import { CampaignModule } from './Modules/Campaign/campaign.module';
import { LanguageMiddleware } from './Middlewares/language.middleware';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CustomValidationPipe } from './Common/Pipes/custom.validation.pipe';
import { MinioModule } from './Common/Minio/minio.module';
import { ReelsModule } from './Modules/Reels/reels.module';
import {
  I18nModule,
  I18nJsonLoader,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { PaymentModule } from './Modules/Payment/payment.module';
import { seed, ensureAdmin } from './DataBase/seed';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets', 'Images'),
      serveRoot: '/pictures',
    }),
    TypeOrmModule.forRootAsync(TypeORMConfig),
    I18nModule.forRoot({
      fallbackLanguage: 'ar',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: join(__dirname, '..', 'assets', 'translations'),
        watch: false,
        includeSubfolders: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
      ],
      returnObjects: true,
    }),
    // Global rate limiting (ttl in milliseconds)
    ThrottlerModule.forRoot([
      {
        limit: 10,
        ttl: 60000,
      },
    ]),
    CommonModule,
    AuthModule,
    CampaignModule,
    MinioModule,
    ReelsModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CsrfMiddleware)
      .exclude(
        { path: 'payments/webhook', method: RequestMethod.POST },
        { path: 'payments/webhook/*', method: RequestMethod.POST },
        { path: 'payments/mock-webhook', method: RequestMethod.POST },
        { path: 'payments/mock-webhook/*', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
  constructor(
    private dataSource: DataSource,
    private hashingService: HashingService,
  ) {}

  async onApplicationBootstrap() {
    if (this.dataSource.isInitialized) {
      console.log('Database connected successfully 🟢 ');
    } else {
      console.log('Fail To connect to database 🔴 ');
    }
    if (!process.env.SKIP_SEED) {
      try {
        await ensureAdmin(this.dataSource, this.hashingService);
      } catch (err) {
        console.error('Failed to ensure admin on bootstrap:', err);
      }
      console.log('Admin ensured on bootstrap. Full seeding is reserved for CLI.');
    } else {
      console.log('Skipping automatic seed (SKIP_SEED is set)');
    }
  }
}
