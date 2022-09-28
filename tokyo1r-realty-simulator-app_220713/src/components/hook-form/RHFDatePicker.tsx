// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { DatePickerView } from '@mui/lab/DatePicker/shared';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  label: string;
  views?: DatePickerView[];
}

export default function RHFDatePicker({ name, ...other }: IProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          {...other}
          renderInput={(params) => <TextField error={!!error} {...params} />}
        />
      )}
    />
  );
}
