import {
  IsOptional,
  IsString,
} from 'class-validator';

export class PropertyAddressDto {
  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  principal?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  additionalInfo?: string;
}
