import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PropertyOwnerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
