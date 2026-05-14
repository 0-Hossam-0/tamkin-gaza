import {
  MiddlewareConsumer,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { AuthModule } from './Modules/Auth/auth.module';
import { CommonModule } from './Common/common.module';
import { TypeORMConfig } from './Config/typeorm.config';
import { CampaignModule } from './Modules/Campaign/campaign.module';
import { LanguageMiddleware } from './Middlewares/language.middleware';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './Common/Pipes/custom.validation.pipe';
import { MinioModule } from './Common/Minio/minio.module';
import { ReelsModule } from './Modules/Reels/reels.module';
import { PaymentModule } from './Modules/Payment/payment.module';
import { I18nModule, I18nJsonLoader } from 'nestjs-i18n';

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
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: join(__dirname, '..', 'assets', 'translations'),
        watch: false,
        includeSubfolders: true,
      },
      returnObjects: true,
    }),
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
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*');
  }
  constructor(private dataSource: DataSource) { }

  async onApplicationBootstrap() {
    if (this.dataSource.isInitialized) {
      console.log('Database connected successfully 🟢 ');
    } else {
      console.log('Fail To connect to database 🔴 ');
    }
  }
}
