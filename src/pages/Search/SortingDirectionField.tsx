import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SortingDirections, getSortingDirectionString } from '../../types/SearchTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { removeEmptySearchParams } from '../../utils/utils';

interface SortingDirectionFieldProps {
  minWidth: number;
}

const label = 'Typ sortowania';

function SortingDirectionField({ minWidth }: SortingDirectionFieldProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryValue = searchParams.get(SEARCH_PARAMS.SORT_ASC);
  const value = queryValue ? SortingDirections.Ascending : SortingDirections.Descending;

  const handleChange = (event: SelectChangeEvent<SortingDirections>) => {
    searchParams.set(SEARCH_PARAMS.SORT_ASC, event.target.value);
    navigate({
      pathname: ROUTES.SEARCH,
      search: removeEmptySearchParams(searchParams).toString(),
    });
  };

  return (
    <FormControl sx={{ minWidth: minWidth }} size='small'>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleChange}>
        <MenuItem value={SortingDirections.Ascending}>
          {getSortingDirectionString(SortingDirections.Ascending)}
        </MenuItem>
        <MenuItem value={SortingDirections.Descending}>
          {getSortingDirectionString(SortingDirections.Descending)}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortingDirectionField;
