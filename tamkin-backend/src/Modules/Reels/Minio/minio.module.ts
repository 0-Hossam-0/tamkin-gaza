import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { CommonModule } from 'src/Common/common.module';

@Module({
  imports: [CommonModule],
  providers: [MinioService],
  exports: [MinioService],
})
export class MinioModule { }
