export type SimulationSettings = {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  createdAt: Date | string | number;

  // settings
  general: {
    age: number;
    simulationPeriodInYears: number;
    startDate: Date;
  };
  property: {
    propertyPrice: number;
    initialPayment: number;
    isRentGuaranteed: boolean;
    rentRevenue: number;
    rentCollectionServiceFee: number;
    managementCost: number;
    repairReserve: number;
  };
  loan: {
    borrowingAmount: number;
    annualInterestRate: number;
    borrowingPeriodInYears: number;
  };
};
