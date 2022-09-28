export type SimulationSettingsValueProps = {
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

export type SimulationSettingsContextProps = SimulationSettingsValueProps & {
  onToggleIsRentGuaranteed: VoidFunction;
  setSettings: Function;
};

export type SimulationSettingsFormValuesProps = SimulationSettingsValueProps & {
  afterSubmit?: string;
};
