import { Module } from '@nestjs/common';
import { ApkService } from './apk.service';
import { ApkController } from './apk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from '../schemas/apk.schema';
import { AzureStorageModule } from '../azure-storage.module'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Application', schema: ApplicationSchema }]),
    AzureStorageModule
  ],
  providers: [ApkService],
  controllers: [ApkController],
  exports: [ApkService]
})
export class ApkModule {}
