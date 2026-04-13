import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  main(req: Request) {

    const language = req.headers["accept-language"] || "en";

    return {
      organization: (req as any).t('main:organization', { returnObjects: true }),
      project: (req as any).t('main:project', { returnObjects: true }),
      about: (req as any).t('main:about', { returnObjects: true }),
      whyThisProject: (req as any).t('main:whyThisProject', { returnObjects: true }),
      targetAudience: (req as any).t('main:targetAudience', { returnObjects: true }),
      operations: (req as any).t('main:operations', { returnObjects: true }),
      supportTypes: (req as any).t('main:supportTypes', { returnObjects: true }),
      people: (req as any).t('main:people', { returnObjects: true }),
      values: (req as any).t('main:values', { returnObjects: true }),
      transparency: (req as any).t('main:transparency', { returnObjects: true }),
      contact: (req as any).t('main:contact', { returnObjects: true }),
    };
  }
}