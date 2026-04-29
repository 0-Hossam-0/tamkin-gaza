import { Global, Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { CommonModule } from 'src/Common/common.module';

@Global()
@Module({
  imports: [CommonModule],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule { }
