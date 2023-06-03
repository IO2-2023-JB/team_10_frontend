import { Button, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { useMobileLayout } from '../../theme';
import { removeEmptySearchParams } from '../../utils/utils';
import DatePickerFilter from './DatePickerFilter';
import SortingDirectionField from './SortingDirectionField';
import SortingTypeField from './SortingTypeField';

const minWidth = 150;

function SearchFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mobileQuery } = useMobileLayout();

  const search = (key: string, value?: string) => {
    if (!value) searchParams.delete(key);
    else {
      searchParams.set(key, value);
      navigate(
        {
          pathname: ROUTES.SEARCH,
          search: removeEmptySearchParams(searchParams).toString(),
        },
        { replace: true }
      );
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
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 1,
          justifyContent: 'flex-end',

          [mobileQuery]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 2,
          },
        }}
      >
        <SortingTypeField minWidth={minWidth} search={search} />
        <SortingDirectionField minWidth={minWidth} search={search} />
        <DatePickerFilter
          width={minWidth}
          label='Dodano po'
          queryKey={SEARCH_PARAMS.START_DATE}
          search={search}
        />
        <DatePickerFilter
          width={minWidth}
          label='Dodano przed'
          queryKey={SEARCH_PARAMS.END_DATE}
          search={search}
        />
        <Button onClick={handleClearFilters}>Wyczyść</Button>
      </Stack>
    </LocalizationProvider>
  );
}

export default SearchFilters;
