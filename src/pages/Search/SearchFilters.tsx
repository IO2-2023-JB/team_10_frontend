import { Button, Stack } from '@mui/material';
import SortingTypeField from './SortingTypeField';
import SortingDirectionField from './SortingDirectionField';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { removeEmptySearchParams } from '../../utils/utils';
import DatePickerFilter from './DatePickerFilter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const minWidth = 150;

function SearchFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = (key: string, value?: string) => {
    if (!value) searchParams.delete(key);
    else {
      searchParams.set(key, value);
      navigate({
        pathname: ROUTES.SEARCH,
        search: removeEmptySearchParams(searchParams).toString(),
      });
    }
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    params.append(SEARCH_PARAMS.QUERY, searchParams.get(SEARCH_PARAMS.QUERY)!);
    navigate({
      pathname: ROUTES.SEARCH,
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack alignSelf='end' direction='row' spacing={1}>
        <SortingTypeField minWidth={minWidth} search={search} />
        <SortingDirectionField minWidth={minWidth} search={search} />
        <DatePickerFilter
          width={minWidth}
          label='Od'
          queryKey={SEARCH_PARAMS.START_DATE}
          search={search}
        />
        <DatePickerFilter
          width={minWidth}
          label='Do'
          queryKey={SEARCH_PARAMS.END_DATE}
          search={search}
        />
        <Button onClick={handleClearFilters}>Wyczyść</Button>
      </Stack>
    </LocalizationProvider>
  );
}

export default SearchFilters;
