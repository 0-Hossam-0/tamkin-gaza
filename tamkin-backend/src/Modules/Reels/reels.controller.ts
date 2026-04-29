import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Get,
  Put,
  Query,
  Body,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReelsService } from './reels.service';
import { Auth } from 'src/Common/Decorators/Auth/auth.decorator';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';
import { IRequest } from 'src/Common/Types/request.types';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { PaginationDto, SearchReelsDto, UpdateReelDto, UploadReelDto } from './Dto/reels.dto';

@Controller('reels')
export class ReelsController {

  constructor(
    private readonly reelsService: ReelsService,
    private readonly responseService: ResponseService,
  ) { }

  @Auth([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 100 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^video\/(mp4|mkv|webm|avi|quicktime|x-m4v)$/)) {
          return cb(new Error('reels:errors.invalid_file_type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadReel(
    @Req() req: IRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadReelDto,
  ) {

    const { password: _password, provider, nationality, ...user } = req.user!;

    const reel = await this.reelsService.uploadReel(
      file,
      user,
      dto
    );
    return this.responseService.success({
      message: 'reels:success.uploaded_successfully',
      data: reel,
    });
  }


  @Get('search')
  async searchReels(@Query() query: SearchReelsDto) {
    const data = await this.reelsService.searchReels(query);
    return this.responseService.success({
      message: 'reels:success.fetched_successfully',
      data,
    });
  }

  @Get('user/:userId')
  async getReelsByUserId(@Param('userId', ParseUUIDPipe) userId: string, @Query() query: PaginationDto) {
    const data = await this.reelsService.getReelsByUserId(userId, query);
    return this.responseService.success({
      message: 'reels:success.fetched_successfully',
      data,
    });
  }

  @Get(':id')
  async getReelById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.reelsService.getReelById(id);
    return this.responseService.success({
      message: 'reels:success.fetched_successfully',
      data,
    });
  }

  @Get()
  async getAllReels(@Query() query: PaginationDto) {
    const data = await this.reelsService.getAllReels(query);
    return this.responseService.success({
      message: 'reels:success.fetched_successfully',
      data,
    });
  }

  @Auth([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Put('update/:id')
  async updateReel(@Req() req: IRequest, @Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateReelDto) {
    const data = await this.reelsService.updateReel(id, dto, req.user!);
    return this.responseService.success({
      message: 'reels:success.updated_successfully',
      data,
    });
  }


  @Auth([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Delete(':id')
  async deleteReel(@Req() req: IRequest, @Param('id', ParseUUIDPipe) id: string) {
    await this.reelsService.deleteReel(id, req.user!);
    return this.responseService.success({
      message: 'reels:success.deleted_successfully',
    });
  }

}