import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  AutocompleteValue,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useField } from 'formik';
import { SyntheticEvent } from 'react';

type FormikAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = {
  name: string;
  TextFieldProps?: TextFieldProps;
} & Omit<AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>;

function FormikAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  TextFieldProps = {},
  ...AutocompleteProps
}: FormikAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  type Value = AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  const [field, meta, helpers] = useField<Value>(name);

  const config: TextFieldProps = {
    ...field,
    fullWidth: true,
    variant: 'outlined',
    error: false,
    helperText: '',
    onChange: undefined,
    ...TextFieldProps,
  };

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: Value,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => {
    AutocompleteProps.onChange?.(event, value, reason, details);
    field.onChange(event);
    helpers.setValue(value);
  };

  return (
    <Autocomplete
      {...AutocompleteProps}
      defaultValue={meta.initialValue}
      renderInput={(params) => <TextField {...TextFieldProps} {...params} {...config} />}
      onChange={handleChange}
    />
  );
}

export default FormikAutocomplete;
