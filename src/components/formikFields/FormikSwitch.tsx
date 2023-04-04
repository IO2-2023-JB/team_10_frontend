import { Switch, Stack, Typography, SwitchProps } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { ChangeEvent } from 'react';
import { UserDetailsEditFormValues } from './../../pages/User/UserDetailsEditForm';

type FormikSwitchProps = {
  name: string;
  leftLabel: string;
  rightLabel: string;
  options: (number | boolean | string)[];
} & SwitchProps;

function FormikSwitch({
  name,
  leftLabel,
  rightLabel,
  options,
  ...others
}: FormikSwitchProps) {
  const [field] = useField(name);
  const { setFieldValue, values } = useFormikContext<UserDetailsEditFormValues>();
  const config: SwitchProps = {
    ...field,
    ...others,
  };

  const handleChange = (e: ChangeEvent, checked: boolean) => {
    if (checked) setFieldValue(name, options[1]);
    else setFieldValue(name, options[0]);
  };

  return (
    <Stack sx={{ paddingX: 1, alignItems: 'center' }} direction='row' spacing={1}>
      <Typography>{leftLabel}</Typography>
      <Switch
        {...config}
        onChange={handleChange}
        checked={values.userType === options[0] ? false : true}
      />
      <Typography>{rightLabel}</Typography>
    </Stack>
  );
}

export default FormikSwitch;
