import { BaseInterface } from '@interfaces/base.interface';


export class PropertyAddress {
  postalCode?: string;
  principal?: string;
  city?: string;
  additionalInfo?: string;
}

export class PropertyOwner {
  id: string;
  name?: string;
  avatarUrl?: string;
}

class PropertyDetail {
  // volatility
  rentChangeRate?: number;
  sellingPriceChangeRate?: number;
  propertyPriceDropRate?: number;
  vacancyRate?: number;

  // other items
  propertyAcquisitionTax?: number;
  otherPayments?: number;
  propertyTax?: number;
  fireInsurance?: number;
  bathroomDryer?: number;
  airConditioner?: number;
  boiler?: number;
  wallpaperReplacement?: number;
  floorReplacement?: number;
}

export class PropertyInterface extends BaseInterface {
  static collectionName = 'properties';

  title: string;
  builtAt: Date;
  owner: PropertyOwner;

  // Property price
  propertyPrice: number;
  initialPayment: number;

  // Rent
  rentRevenue: number;
  isRentRevenueGuaranteed: boolean;
  rentCollectionServiceFee: number;
  managementCost: number;
  repairReserve: number;

  // Loan
  borrowingAmount: number;
  annualInterestRate: number;
  borrowingPeriodInYears: number;
  monthlyLoanPaymentAmount: number;

  // Optional
  cover?: string;
  description?: string;
  body?: string;
  tags?: string[];
  address?: PropertyAddress;
  numberOfSquareMeters?: number;
  detail?: PropertyDetail;

  constructor(init: Partial<PropertyInterface>) {
    super();
    Object.assign(this, init);
  }
}
