import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { PropertyAddressDto } from '@/dtos/property-address.dto';
import { PropertyOwnerDto } from '@/dtos/property-owner.dto';
import { PropertyDetailDto } from '@/dtos/property-detail.dto';


export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Type(() => PropertyOwnerDto)
  owner: PropertyOwnerDto;

  @IsDateString()
  @IsNotEmpty()
  builtAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  propertyPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  initialPayment: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  rentRevenue: number;

  @IsBoolean()
  @IsNotEmpty()
  isRentRevenueGuaranteed: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  borrowingAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  annualInterestRate: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  borrowingPeriodInYears: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  rentCollectionServiceFee: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  managementCost: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  repairReserve: number;

  // Optional

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ValidateNested()
  @Type(() => PropertyAddressDto)
  @IsOptional()
  address?: PropertyAddressDto;

  @IsNumber()
  @IsOptional()
  @Min(0)
  numberOfSquareMeters?: number;

  @ValidateNested()
  @Type(() => PropertyDetailDto)
  @IsOptional()
  detail?: PropertyDetailDto;
}
