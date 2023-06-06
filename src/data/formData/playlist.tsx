import * as Yup from 'yup';
import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { PlaylistVisibility } from '../../types/PlaylistTypes';

export const playlistValidationSchema = new Yup.ObjectSchema({
  name: Yup.string().required('Pole wymagane'),
});

export function PlaylistFormFields() {
  return (
    <>
      <FormikTextField name='name' label='Nazwa' />
      <FormikSwitch
        name='visibility'
        labels={['Prywatna', 'Publiczna']}
        options={[PlaylistVisibility.Private, PlaylistVisibility.Public]}
      />
    </>
  );
}
