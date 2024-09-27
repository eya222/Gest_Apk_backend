import { Module } from '@nestjs/common';
import { AzureStorageService } from './azure-storage.service';

@Module({
  providers: [AzureStorageService],
  exports: [AzureStorageService], // Make sure to export the service
})
export class AzureStorageModule {}
