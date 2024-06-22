import { Module } from '@nestjs/common';
import { FileModule } from './file-manager/file.module';

@Module({
  imports: [
    FileModule,
  ],
})
export class AppModule { }
