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
import { SyntheticEvent, useEffect, useState } from 'react';

type FormikAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = {
  name: string;
  TextFieldProps?: TextFieldProps;
  options?: T[];
  optionsPromiseFn?: () => Promise<T[]>;
} & Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'options'
>;

function FormikAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  TextFieldProps = {},
  options = [],
  optionsPromiseFn,
  ...AutocompleteProps
}: FormikAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  type Value = AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>;
  const [field, meta, helpers] = useField<Value>(name);

  const [asyncOptions, setAsyncOptions] = useState<T[] | null>(null);

  const handleAsyncOptions = async () => {
    if (optionsPromiseFn !== undefined) {
      const options = await optionsPromiseFn();
      setAsyncOptions(options);
    }
  };

  useEffect(() => {
    handleAsyncOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculatedOptions = optionsPromiseFn !== undefined ? asyncOptions : options;
  const loading = optionsPromiseFn !== undefined && asyncOptions === null;

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
      options={calculatedOptions ?? []}
      loading={loading}
      defaultValue={meta.initialValue}
      renderInput={(params) => <TextField {...TextFieldProps} {...params} {...config} />}
      onChange={handleChange}
    />
  );
}

export default FormikAutocomplete;
