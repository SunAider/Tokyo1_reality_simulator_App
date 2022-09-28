import { CreatePropertyDto } from "@/dtos/properties.dto";
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateMyPropertyDto extends CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  uid: string;
}
