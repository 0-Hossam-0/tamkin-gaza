import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  RawBodyRequest,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard, SkipThrottle } from '@nestjs/throttler';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './Dtos/create-payment.dto';
import { AdminFilterPaymentsDto } from './Dtos/admin-filter-payments.dto';
import { PaginationDto } from 'src/Modules/User/Dtos/pagination.dto';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import type { IRequest } from 'src/Common/Types/request.types';
import { PaymentTargetTypeEnum } from './Enums/payment-target-type.enum';
import { CampaignService } from 'src/Modules/Campaign/campaign.service';
import { AuthenticationGuard } from 'src/Common/Guards/Authentication/authentication.guard';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';
import { Auth } from 'src/Common/Decorators/Auth/auth.decorator';

@UseGuards(ThrottlerGuard)
@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthenticationGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto, @Req() req: IRequest) {
    const userUuid = req.user!.uuid;
    const idempotencyKey = req.headers['idempotency-key'] as string;

    if (!idempotencyKey)
      this.responseService.badRequest({ message: 'payment.errors.idempotency_key_required' });

    // Load the target model based on targetType, also passing the amount
    // so the service can reject over-target donations upfront.
    const targetModel = await this.paymentService.loadTargetModel(
      createPaymentDto.targetType,
      createPaymentDto.uuid,
      createPaymentDto.amount,
    );

    const data = await this.paymentService.createPayment(
      createPaymentDto,
      userUuid,
      idempotencyKey,
      targetModel,
      req.ip,
    );
    return this.responseService.success({
      message: 'payment.success.payment_initiated',
      statusCode: HttpStatus.CREATED,
      data,
    });
  }

  @Post('webhook/:provider')
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Param('provider') provider: string,
    @Req() req: RawBodyRequest<IRequest>,
    @Body() body: any,
  ) {
    const payload = req.rawBody || body;
    const headersWithQuery = {
      ...req.headers,
      ...req.query,
    } as unknown as Record<string, string | string[] | undefined>;
    const data = await this.paymentService.handleWebhook(provider, headersWithQuery, payload);
    return this.responseService.success({ data });
  }

  // Helper endpoint for local development / mock testing only.
  // Remove or guard this behind an admin role in production.
  @Post('mock-webhook/:provider')
  @HttpCode(HttpStatus.OK)
  @SkipThrottle()
  async handleMockWebhook(@Param('provider') provider: string, @Body() body: any) {
    const data = await this.paymentService.handleWebhook(provider, {}, body);
    return this.responseService.success({ data });
  }

  @Get('my-payments')
  @UseGuards(AuthenticationGuard)
  async getMyPayments(@Query() paginationDto: PaginationDto, @Req() req: IRequest) {
    const userUuid = req.user!.uuid;
    const data = await this.paymentService.findUserPayments(userUuid, paginationDto);
    return this.responseService.success({
      message: 'payment.success.payments_fetched',
      data,
    });
  }

  @Get()
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async getAllPayments(@Query() filterDto: AdminFilterPaymentsDto) {
    const data = await this.paymentService.findAll(filterDto);
    return this.responseService.success({
      message: 'payment.success.payments_fetched',
      data,
    });
  }

  @Get(':id')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async getPayment(@Param('id') id: string) {
    const data = await this.paymentService.findOne(id);
    return this.responseService.success({
      message: 'payment.success.payment_fetched',
      data,
    });
  }

  @Get(':target/:id')
  @Auth([UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN])
  async getCampaignPayments(
    @Param('target') targetType: PaymentTargetTypeEnum,
    @Param('id') targetUuid: string,
  ) {
    const data = await this.paymentService.getTargetPayments(targetUuid, targetType);
    return this.responseService.success({
      message: 'payment.success.target_payments_fetched',
      data,
    });
  }
}
