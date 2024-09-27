import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, Update } from '../schemas/apk.schema';
import { Express } from 'express';
import { uuid } from 'uuidv4';
import { AzureStorageService } from '../azure-storage.service';
import { CreateUpdateDto } from './dto/update.dto';
@Injectable()
export class ApkService {
    constructor(
        @InjectModel('Application') private readonly applicationModel: Model<Application>,
        private readonly azureStorageService: AzureStorageService,
      ) {}
      readonly azureConn= process.env.Azure_Storage;
      
      async create(createApplicationDto: any): Promise<Application> {
        const createdApplication = new this.applicationModel(createApplicationDto);
        return createdApplication.save();
      }
    
      async findAll(): Promise<Application[]> {
        return this.applicationModel.find().exec();
      }
    
      async findOne(id: string): Promise<Application> {
        return this.applicationModel.findById(id).exec();
      }
    
      async update(id: string, updateApplicationDto: any): Promise<Application> {
        return this.applicationModel.findByIdAndUpdate(id, updateApplicationDto, { new: true }).exec();
      }
      async addUpdate(appId: string, files: any, body:any ): Promise<any> {
        
    
        // Log received files and form data
        console.log('Received Files:', files);
        
    
        
    
        const newUpdate = {
          date: body.date,
          consultantTechnique: body.consultantTechnique,
          
          consultantFonctionnel: body.consultantFonctionnel,
          apk: files.apk ? await this.azureStorageService.uploadFile('apk-container', files.apk[0]) : null,
          document: files.document ? await this.azureStorageService.uploadFile('document-container', files.document[0]) : null,
          demo: files.demo ? await this.azureStorageService.uploadFile('demo-container', files.demo[0]) : null,
          photos: files.photos ? await Promise.all(files.photos.map(photo => this.azureStorageService.uploadFile('photo-container', photo))) : []
        };
        console.log("woooorks",newUpdate.consultantTechnique);
        // Retrieve the application to update
        const app = await this.findOne(appId);
        if (!app) {
          throw new Error('Application not found');
        }
    
        app.updates.unshift(newUpdate as any); // Adds the new update to the start of the array
    
        await this.update(appId, app);
    
        return app;
      }
      async getSuggestions(query: string): Promise<Application[]> {
        // Return results that match the query, ignoring case
        return this.applicationModel.find({
          $or: [
            { client: { $regex: query, $options: 'i' } },
            { name: { $regex: query, $options: 'i' } }
          ]
        }).limit(10).exec(); // Limit the number of suggestions
      }
    
}
