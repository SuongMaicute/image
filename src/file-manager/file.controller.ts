import { Controller, Param, Post, Res, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor, MemoryStorageFile, UploadedFile } from "@blazity/nest-file-fastify";
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('file')
@Controller('file')
export class FileController {

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            },
        },
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: MemoryStorageFile, @Res() res: any) {
        try {
            // write file to folder uploads
            const fileName = uuidv4() + '.' + file.mimetype.split('/')[1];
            // check folder exist
            if (!require('fs').existsSync(join(__dirname, '..', '..', 'uploads', 'image'))) {
                require('fs').mkdirSync(join(__dirname, '..', '..', 'uploads', 'image'));
            }
            // write file
            require('fs').writeFileSync(join(__dirname, '..', '..', 'uploads', 'image', fileName), file.buffer);
            // return file name
            res.send({ path: 'image' + '/' + fileName });
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            },
        },
    })
    @Post('rewrite/image/:path')
    @UseInterceptors(FileInterceptor('file'))
    rewriteFile(@UploadedFile() file: MemoryStorageFile, @Param('path') path: string, @Res() res: any) {
        try {
            // remove old file specified by path and check folder exist
            if (require('fs').existsSync(join(__dirname, '..', '..', 'uploads', 'image', path))) {
                require('fs').unlinkSync(join(__dirname, '..', '..', 'uploads', 'image', path));
            }
            // write file to folder uploads
            var fileName = uuidv4() + '.' + file.mimetype.split('/')[1];
            // check folder exist
            if (!require('fs').existsSync(join(__dirname, '..', '..', 'uploads', 'image'))) {
                require('fs').mkdirSync(join(__dirname, '..', '..', 'uploads', 'image'));
            }
            // write file
            require('fs').writeFileSync(join(__dirname, '..', '..', 'uploads', 'image', fileName), file.buffer);
            // return file name
            res.send({ path: 'image' + '/' + fileName });
        } catch (error) {
            res.status(500).send(error);
        }
    }

} 