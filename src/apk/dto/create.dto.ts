import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUpdateDto } from './update.dto';

export class CreateAppDto {
  @IsString()
  client: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUpdateDto)
  updates: CreateUpdateDto[];
}
