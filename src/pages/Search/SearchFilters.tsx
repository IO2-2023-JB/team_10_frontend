import { Stack } from '@mui/material';
import SortingTypeField from './SortingTypeField';
import SortingDirectionField from './SortingDirectionField';

const minWidth = 150;

function SearchFilters() {
  return (
    <Stack alignSelf='end' direction='row' spacing={1}>
      <SortingTypeField minWidth={minWidth} />
      <SortingDirectionField minWidth={minWidth} />
    </Stack>
  );
}

export default SearchFilters;
