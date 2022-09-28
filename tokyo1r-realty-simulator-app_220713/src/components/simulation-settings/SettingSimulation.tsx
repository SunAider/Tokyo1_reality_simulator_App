import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useLocales from '../../hooks/useLocales';
// components
import { FormProvider, RHFCheckbox, RHFTextField, RHFDatePicker } from '../hook-form';
import useSimulationSettings from 'src/hooks/useSimulationSettings';
import { SimulationSettingsFormValuesProps } from './type';
// import { fDate } from 'src/utils/formatTime';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SettingSimulation() {
  const { translate } = useLocales();
  const isMountedRef = useIsMountedRef();
  const { general, property, loan, onToggleIsRentGuaranteed, setSettings } =
    useSimulationSettings();

  // Form settings
  const simulationSettingSchema = Yup.object().shape({
    general: Yup.object().shape({
      startDate: Yup.date().required(),
      age: Yup.number().positive().required(),
      simulationPeriodInYears: Yup.number().positive().required(),
    }),
    property: Yup.object().shape({
      propertyPrice: Yup.number().positive().required(),
      initialPayment: Yup.number().positive().required(),
      isRentGuaranteed: Yup.bool().required(),
      rentRevenue: Yup.number().positive().required(),
      rentCollectionServiceFee: Yup.number().positive().required(),
      managementCost: Yup.number().positive().required(),
      repairReserve: Yup.number().positive().required(),
    }),
    loan: Yup.object().shape({
      borrowingAmount: Yup.number().positive().required(),
      annualInterestRate: Yup.number().positive().required(),
      borrowingPeriodInYears: Yup.number().required(),
    }),
  });
  const defaultValues = {
    general,
    property,
    loan,
  };
  const methods = useForm<SimulationSettingsFormValuesProps>({
    resolver: yupResolver(simulationSettingSchema),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: SimulationSettingsFormValuesProps) => {
    try {
      setSettings(data);
      // await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  const InputGeneral = (
    <>
      <Typography variant="subtitle2">{translate('dashboard.settings.general.title')}</Typography>
      <RHFDatePicker
        name="general.startDate"
        views={['year', 'month']}
        label={translate('dashboard.settings.general.startDate')}
      />
      <RHFTextField
        name="general.age"
        type="number"
        label={translate('dashboard.settings.general.age')}
      />
      <RHFTextField
        name="general.simulationPeriodInYears"
        type="number"
        label={translate('dashboard.settings.general.simulationPeriodInYears')}
      />
    </>
  );

  const InputProperty = (
    <>
      <Typography variant="subtitle2">{translate('dashboard.settings.property.title')}</Typography>
      <RHFTextField
        name="property.propertyPrice"
        type="number"
        label={translate('dashboard.settings.property.propertyPrice')}
      />
      <RHFTextField
        name="property.initialPayment"
        type="number"
        label={translate('dashboard.settings.property.initialPayment')}
      />
      <RHFCheckbox
        name="property.isRentGuaranteed"
        label={String(translate('dashboard.settings.property.isRentGuaranteed'))}
        value={property.isRentGuaranteed}
        onClick={(e) => {
          // console.log(e.target.checked);
          onToggleIsRentGuaranteed();
        }}
      />
      <RHFTextField
        name="property.rentRevenue"
        type="number"
        label={translate('dashboard.settings.property.rentRevenue')}
      />
      <RHFTextField
        name="property.rentCollectionServiceFee"
        type="number"
        label={translate('dashboard.settings.property.rentCollectionServiceFee')}
      />
      <RHFTextField
        name="property.managementCost"
        type="number"
        label={translate('dashboard.settings.property.managementCost')}
      />
      <RHFTextField
        name="property.repairReserve"
        type="number"
        label={translate('dashboard.settings.property.repairReserve')}
      />
    </>
  );

  const InputLoan = (
    <>
      <Typography variant="subtitle2">{translate('dashboard.settings.loan.title')}</Typography>
      <RHFTextField
        name="loan.borrowingAmount"
        type="number"
        label={translate('dashboard.settings.loan.borrowingAmount')}
      />
      <RHFTextField
        name="loan.annualInterestRate"
        type="number"
        label={translate('dashboard.settings.loan.annualInterestRate')}
      />
      <RHFTextField
        name="loan.borrowingPeriodInYears"
        type="number"
        label={translate('dashboard.settings.loan.borrowingPeriodInYears')}
      />
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        {InputGeneral}

        {InputProperty}

        {InputLoan}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {translate('buttons.saveSettings')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
