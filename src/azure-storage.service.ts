import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

import { uuid } from 'uuidv4';

@Injectable()
export class AzureStorageService {
  private blobServiceClient: BlobServiceClient;
  readonly azureConn= process.env.Azure_Storage;

  constructor() {
    const connectionString = "DefaultEndpointsProtocol=https;AccountName=gestionapk;AccountKey=x74OHwF9ESFnLS7zqe3zdS9/roTpv9fdmyHavdKxJzwHlgncTDlWEicBYLgotU6xtHfFB9Dt4+8o+ASt2fS5rA==;EndpointSuffix=core.windows.net"
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
  }

  async uploadFile(containerName: string, file: Express.Multer.File): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blobName = uuid() + file.originalname; // Generate a unique name for the file
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);
    return blockBlobClient.url;
  }

  async uploadFiles(containerName: string, files: Express.Multer.File[]): Promise<string[]> {
    const fileUrls = await Promise.all(
      files.map(file => this.uploadFile(containerName, file))
    );
    return fileUrls;
  }
}
