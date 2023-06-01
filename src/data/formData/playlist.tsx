import FormikSwitch from '../../components/formikFields/FormikSwitch';
import FormikTextField from '../../components/formikFields/FormikTextField';
import { PlaylistVisibility } from '../../types/PlaylistTypes';

export const formFields = (
  <>
    <FormikTextField name='name' label='Nazwa' />
    <FormikSwitch
      name='visibility'
      labels={['Prywatna', 'Publiczna']}
      options={[PlaylistVisibility.Private, PlaylistVisibility.Public]}
    />
  </>
);
