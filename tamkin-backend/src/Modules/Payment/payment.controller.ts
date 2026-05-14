import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './Dtos/create-payment.dto';
import type { IRequest } from 'src/Common/Types/request.types';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req: IRequest,
  ) {
    // If the user is authenticated, we attach their uuid. Otherwise, it will be undefined (guest).
    const userUuid = req.user?.uuid;
    return await this.paymentService.createPayment(createPaymentDto, userUuid);
  }

  @Post('webhook/:provider')
  async handleWebhook(
    @Param('provider') provider: string,
    @Req() req: RawBodyRequest<IRequest>,
    @Body() body: any,
  ) {
    // Some providers like Stripe require the raw body to verify the signature
    const payload = req.rawBody || body; 
    
    return await this.paymentService.handleWebhook(provider, req.headers as any, payload);
  }

  // Helper endpoint for local development/testing of mock mode
  @Post('mock-webhook/:provider')
  async handleMockWebhook(
    @Param('provider') provider: string,
    @Body() body: any,
  ) {
    return await this.paymentService.handleWebhook(provider, {}, body);
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    return await this.paymentService.findOne(id);
  }
}
