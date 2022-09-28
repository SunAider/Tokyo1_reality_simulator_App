import {
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class PropertyDetailDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  rentChangeRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sellingPriceChangeRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  propertyPriceDropRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  vacancyRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  propertyAcquisitionTax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  otherPayments?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  propertyTax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fireInsurance?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bathroomDryer?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  airConditioner?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  boiler?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  wallpaperReplacement?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  floorReplacement?: number;
}
