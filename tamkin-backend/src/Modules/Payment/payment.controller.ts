import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  RawBodyRequest,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './Dtos/create-payment.dto';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import type { IRequest } from 'src/Common/Types/request.types';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @Req() req: IRequest,
  ) {
    // If the user is authenticated, attach their uuid; otherwise undefined (guest checkout).
    const userUuid = req.user?.uuid;
    const data = await this.paymentService.createPayment(createPaymentDto, userUuid);
    return this.responseService.success({
      message: 'payment.success.payment_initiated',
      statusCode: HttpStatus.CREATED,
      data,
    });
  }

  @Post('webhook/:provider')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Param('provider') provider: string,
    @Req() req: RawBodyRequest<IRequest>,
    @Body() body: any,
  ) {
    // Some providers (Stripe) require the raw body buffer for signature verification.
    const payload = req.rawBody || body;
    const data = await this.paymentService.handleWebhook(
      provider,
      req.headers as unknown as Record<string, string | string[] | undefined>,
      payload,
    );
    return this.responseService.success({ data });
  }

  // Helper endpoint for local development / mock testing only.
  // Remove or guard this behind an admin role in production.
  @Post('mock-webhook/:provider')
  @HttpCode(HttpStatus.OK)
  async handleMockWebhook(
    @Param('provider') provider: string,
    @Body() body: any,
  ) {
    const data = await this.paymentService.handleWebhook(provider, {}, body);
    return this.responseService.success({ data });
  }

  @Get(':id')
  async getPayment(@Param('id') id: string) {
    const data = await this.paymentService.findOne(id);
    return this.responseService.success({
      message: 'payment.success.payment_fetched',
      data,
    });
  }
}
