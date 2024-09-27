import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ApkModule } from './apk/apk.module';
import { MulterModule } from '@nestjs/platform-express';
import http from 'http';
import { ConfigModule } from '@nestjs/config';
import { AzureStorageService } from './azure-storage.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://eyanaimi2002:hey@cluster0.7lchz20.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    MulterModule.register({
      dest: './uploads', // Directory where files will be saved
    }),
    UserModule,
    ApkModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService,AzureStorageService],
})
export class AppModule {}
