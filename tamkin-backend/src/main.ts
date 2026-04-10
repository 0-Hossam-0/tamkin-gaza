import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseStatusInterceptor } from './Common/Interceptors/response.status.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CustomValidationPipe } from './Common/Pipes/custom.validation.pipe';
import { ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from './Common/Utils/Response/error.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(new CustomValidationPipe(new ErrorResponse()));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseStatusInterceptor());

  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();