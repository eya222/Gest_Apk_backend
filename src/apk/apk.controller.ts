import { Get,  UploadedFile, Put,Param,Query} from '@nestjs/common';
import { ApkService } from './apk.service';
import { Application } from '../schemas/apk.schema';

import { AzureStorageService } from '../azure-storage.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateUpdateDto } from './dto/update.dto';
import { CreateAppDto } from './dto/create.dto';
import { 
  Controller, 
  Post, 
  Body, 
  UploadedFiles, 
  UseInterceptors, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@Controller('apk')
export class ApkController {
    constructor(private readonly applicationsService: ApkService,
      private readonly azureStorageService: AzureStorageService,
    ) {}
    @Post('up')
@UseInterceptors(FileFieldsInterceptor([
  { name: 'apk', maxCount: 1 },
  { name: 'document', maxCount: 1 },
  { name: 'photos', maxCount: 10 },
  { name: 'demo', maxCount: 1 },
]))
async uploadFile(
  @UploadedFiles() files: { 
    apk?: Express.Multer.File[], 
    document?: Express.Multer.File[], 
    photos?: Express.Multer.File[], 
    demo?: Express.Multer.File[]
  },
  @Body() body: any
) {
  console.log('Received files and body:', files, body); // Add logging
  try {
    const { name, client, description, CTech, CFonc, date } = body;

    const apkUrl = files.apk ? await this.azureStorageService.uploadFile('apk-container', files.apk[0]) : null;
    const documentUrl = files.document ? await this.azureStorageService.uploadFile('document-container', files.document[0]) : null;
    const photosUrls = files.photos ? await this.azureStorageService.uploadFiles('photo-container', files.photos) : [];
    const demoUrl = files.demo ? await this.azureStorageService.uploadFile('demo-container', files.demo[0]) : null;

    const newUpdate: CreateUpdateDto = {
      consultantTechnique: CTech,
      consultantFonctionnel: CFonc,
      apk: apkUrl,
      document: documentUrl,
      photos: photosUrls,
      demo: demoUrl,
      date,
    };

    const createDto: CreateAppDto = {
      name,
      client,
      description,
      updates: [newUpdate],
    };

    // Create application
    const app = this.applicationsService.create(createDto);
    
    console.log('Application created:', app); // Log created application
    return {
      success: true,
      message: 'Files uploaded successfully',
      application: app
    }; // Explicit success response
  } catch (error) {
    console.error('Error in file upload and app creation:', error); // Log errors
    throw new HttpException('File upload failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

    
      @Get('suggestions')
      async getSuggestions(@Query('query') query: string): Promise<Application[]> {
        return this.applicationsService.getSuggestions(query);
      }
  @Get('all')
  findAll(): Promise<Application[]> {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: any): Promise<Application> {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Post('updates/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'apk', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'demo', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
  ]))
  
  async addUpdate(  @Param('id') appId: string,
  
  @UploadedFiles() files: { apk?: Express.Multer.File[], document?: Express.Multer.File[], demo?: Express.Multer.File[], photos?: Express.Multer.File[] },@Body() body:any
) {
  const app= await this.applicationsService.addUpdate(appId,  files, body );
  console.log("lalalal")
   return {
    success: true,
    message: 'Files uploaded successfully',
    application: app
  };
}

    }
