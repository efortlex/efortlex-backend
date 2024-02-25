import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OkResponseData } from '../common/ok-response-data';
import { SkipThrottle } from '@nestjs/throttler';
import { diskStorage } from 'multer';

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

  @Post('many')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];

          cb(null, `${Date.now()}.${fileExt}`);
        },
      }),
    }),
  )
  @ApiOkResponse({ content: OkResponseData({ url: { type: 'string' } }) })
  @ApiBody({ description: 'Files to upload' })
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log({ files });
    // const newFiles = files.map((file) => ({
    //   filename: file.originalname,
    //   buffer: file.buffer,
    //   metadata: [{ mediaId: v4() }],
    // }));
    // return await this.uploadService.uploadMany(newFiles);

    return {};
  }
}
