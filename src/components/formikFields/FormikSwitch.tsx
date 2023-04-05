import { Stack, Switch, SwitchProps, Typography } from '@mui/material';
import { useField } from 'formik';

type FormikSwitchProps = {
  name: string;
  labels: [string, string];
  options: [unknown, unknown];
} & SwitchProps;

function FormikSwitch({ name, labels, options, ...others }: FormikSwitchProps) {
  const [field, meta, helpers] = useField(name);

  const config: SwitchProps = {
    ...field,
    ...others,
  };

  const checked = meta.value === options[1];

  const handleChange = () => {
    helpers.setValue(options[checked ? 0 : 1]);
  };

  return (
    <Stack sx={{ paddingX: 1, alignItems: 'center' }} direction='row' spacing={1}>
      <Typography>{labels[0]}</Typography>
      <Switch {...config} onChange={handleChange} checked={checked} />
      <Typography>{labels[1]}</Typography>
    </Stack>
  );
}

export default FormikSwitch;
