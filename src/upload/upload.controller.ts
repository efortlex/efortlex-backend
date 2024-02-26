import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OkResponseData } from '../common/ok-response-data';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ content: OkResponseData({ url: { type: 'string' } }) })
  @ApiBody({ description: 'File to upload' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.upload({
      filename: file.originalname,
      buffer: file.buffer,
      metadata: [{ mediaId: v4() }],
    });
  }
}
