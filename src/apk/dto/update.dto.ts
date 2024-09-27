import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  consultantTechnique: string;

  @IsString()
  @IsOptional()
  consultantFonctionnel?: string;

  @IsOptional()
  apk?: string;

  @IsOptional()
  document?: string;

  @IsOptional()
  demo?: string;

  @IsOptional()
  @IsString({ each: true }) 
  photos?: string[];

  @IsOptional()
  date: Date ; 
}
