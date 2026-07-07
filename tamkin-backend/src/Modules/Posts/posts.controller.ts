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
import { PostsService } from './posts.service';
import { Auth } from 'src/Common/Decorators/Auth/auth.decorator';
import { UserRoleEnum } from 'src/Common/Enums/User/user.enum';
import { IRequest } from 'src/Common/Types/request.types';
import { ResponseService } from 'src/Common/Services/Response/response.service';
import { PaginationDto, UpdatePostDto, UploadPostDto } from './Dto/posts.dto';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
    private readonly responseService: ResponseService,
  ) { }

  @Auth([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          return cb(new Error('posts.errors.invalid_file_type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createPost(
    @Req() req: IRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadPostDto,
  ) {

    const { password: _password, provider, nationality, ...user } = req.user!;

    const post = await this.postsService.createPost(
      file,
      user,
      dto
    );
    return this.responseService.success({
      message: 'posts.success.uploaded_successfully',
      data: post,
    });
  }

  @Get()
  async getAllPosts(@Query() query: PaginationDto) {
    const data = await this.postsService.getAllPosts(query);
    return this.responseService.success({
      message: 'posts.success.fetched_successfully',
      data,
    });
  }

  @Get(':id')
  async getPostById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.postsService.getPostById(id);
    return this.responseService.success({
      message: 'posts.success.fetched_successfully',
      data,
    });
  }

  @Auth([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp)$/)) {
          return cb(new Error('posts.errors.invalid_file_type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updatePost(
    @Req() req: IRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePostDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const data = await this.postsService.updatePost(id, dto, req.user!, file);
    return this.responseService.success({
      message: 'posts.success.updated_successfully',
      data,
    });
  }

  @Auth([UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN])
  @Delete(':id')
  async deletePost(@Req() req: IRequest, @Param('id', ParseUUIDPipe) id: string) {
    await this.postsService.deletePost(id, req.user!);
    return this.responseService.success({
      message: 'posts.success.deleted_successfully',
    });
  }

}
