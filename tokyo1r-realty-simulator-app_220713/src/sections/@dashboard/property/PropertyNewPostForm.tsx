import * as Yup from 'yup';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Stack, Typography, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//components
import {
  FormProvider,
  RHFDatePicker,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
import useAuth from '../../../hooks/useAuth';

//
import { CreatePropertyDto, PropertyOwnerDto, PropertyAddressDto } from 'src/api-client';
import useLocales from 'src/hooks/useLocales';
import axiosOpenApiInstance from 'src/utils/axios-openapi';
import { convertBase64 } from 'src/utils/convertBase64';
import { HOST_API } from 'src/config';
import { FIREBASE_ID_TOKEN_KEY } from 'src/utils/firebase';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function PropertyNewPostForm() {
  // const navigate = useNavigate();
  const { translate } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const [cookies, setCookie] = useCookies([FIREBASE_ID_TOKEN_KEY]);

  const NewPropertySchema = Yup.object().shape({
    title: Yup.string().required(),
    builtAt: Yup.date().required(),
    numberOfSquareMeters: Yup.number().min(0).required(),
    propertyPrice: Yup.number().min(0).required(),
    initialPayment: Yup.number().min(0).required(),
    rentRevenue: Yup.number().min(0).required(),
    isRentRevenueGuaranteed: Yup.bool().required(),
    rentCollectionServiceFee: Yup.number().min(0).required(),
    managementCost: Yup.number().min(0).required(),
    repairReserve: Yup.number().min(0).required(),
    borrowingAmount: Yup.number().min(0).required(),
    annualInterestRate: Yup.number().min(0).required(),
    borrowingPeriodInYears: Yup.number().min(0).required(),
    // optional
    cover: Yup.mixed().optional(),
    description: Yup.string().optional(),
    body: Yup.mixed().optional(),
    address: Yup.object().shape({
      postalCode: Yup.string().optional(),
      principal: Yup.string().optional(),
      city: Yup.string().optional(),
      additionalInfo: Yup.string().optional(),
    }),
    tags: Yup.array().of(Yup.string()),
  });

  // default values
  const defaultOwner: PropertyOwnerDto = { id: '', name: '', avatarUrl: '' };
  const defaultAddress: PropertyAddressDto = {
    postalCode: '',
    principal: '',
    city: '',
    additionalInfo: '',
  };
  const defaultValues: CreatePropertyDto = {
    title: '',
    builtAt: new Date().toDateString(),
    owner: defaultOwner,
    numberOfSquareMeters: 25,
    propertyPrice: 30000000,
    initialPayment: 100000,
    rentRevenue: 90000,
    isRentRevenueGuaranteed: false,
    rentCollectionServiceFee: 4500,
    managementCost: 6000,
    repairReserve: 1500,
    borrowingAmount: 29900000,
    annualInterestRate: 1.9,
    borrowingPeriodInYears: 35,
    // optional
    address: defaultAddress,
    description: '',
    cover: '',
    body: '',
    tags: [],
  };

  const methods = useForm<CreatePropertyDto>({
    resolver: yupResolver(NewPropertySchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CreatePropertyDto) => {
    try {
      const firebaseToken = cookies[FIREBASE_ID_TOKEN_KEY];
      const options: AxiosRequestConfig = {
        headers: {
          'authorization': 'Bearer ' + firebaseToken,
          'content-type': 'multipart/form-data'
        }
      }

      const form = new FormData();
      const keys = Object.keys(data);
      keys.forEach(key => {
        form.append(key, data[key as keyof CreatePropertyDto]);
      });
      form.append('address', JSON.stringify(data.address));
      form.append('owner', JSON.stringify(data.owner));

      const reqUrl = HOST_API + '/api/v1/my-properties';
      await axios.post(
        reqUrl,
        form,
        options
      );
      
      // await axiosOpenApiInstance.myPropertiesControllerCreate(data, options);
      reset();
      enqueueSnackbar(translate('toast.success', { value: translate('buttons.create') }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue('cover', await convertBase64(file));
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <LabelStyle>{translate('property.cover')}</LabelStyle>
                  <RHFUploadSingleFile
                    name="cover"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                </div>

                <RHFTextField name="title" label={translate('property.title')} />

                <RHFTextField
                  name="description"
                  label={translate('property.description')}
                  multiline
                  rows={3}
                />
                <RHFDatePicker
                  name="builtAt"
                  views={['year', 'month']}
                  label={translate('property.builtAt')}
                />

                <RHFTextField
                  name="numberOfSquareMeters"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.numberOfSquareMeters')}
                />

                {/* Address */}
                <Divider />
                <RHFTextField
                  name="address.postalCode"
                  label={translate('property.address.postalCode')}
                />
                <RHFTextField
                  name="address.principal"
                  label={translate('property.address.principal')}
                />
                <RHFTextField name="address.city" label={translate('property.address.city')} />
                <RHFTextField
                  name="address.additionalInfo"
                  label={translate('property.address.additionalInfo')}
                />
                {/* Property price */}
                <Divider />
                <RHFTextField
                  name="propertyPrice"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.propertyPrice')}
                />
                <RHFTextField
                  name="initialPayment"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.initialPayment')}
                />

                {/* Rent */}
                <Divider />
                <RHFTextField
                  name="rentRevenue"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.rentRevenue')}
                />
                <RHFSwitch
                  name="isRentRevenueGuaranteed"
                  label={String(translate('property.isRentRevenueGuaranteed'))}
                  labelPlacement="start"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
                <RHFTextField
                  name="rentCollectionServiceFee"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.rentCollectionServiceFee')}
                />
                <RHFTextField
                  name="managementCost"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.managementCost')}
                />
                <RHFTextField
                  name="repairReserve"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.repairReserve')}
                />

                {/* Loan */}
                <Divider />
                <RHFTextField
                  name="borrowingAmount"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.borrowingAmount')}
                />
                <RHFTextField
                  name="annualInterestRate"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  label={translate('property.annualInterestRate')}
                />
                <RHFTextField
                  name="borrowingPeriodInYears"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  label={translate('property.borrowingPeriodInYears')}
                />

                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                >
                  {translate('buttons.create')}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
