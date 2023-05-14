import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SortingDirections, getSortingDirectionString } from '../../types/SearchTypes';
import { useLocation } from 'react-router-dom';
import { SEARCH_PARAMS } from '../../const';

function handleChange() {
  console.log('change');
}

interface SortingDirectionFieldProps {
  minWidth: number;
}

const label = 'Typ sortowania';

function SortingDirectionField({ minWidth }: SortingDirectionFieldProps) {
  const location = useLocation();
  const queryValue = new URLSearchParams(location.search).get(SEARCH_PARAMS.SORT_ASC);
  const value = queryValue ? SortingDirections.Ascending : SortingDirections.Descending;

  return (
    <FormControl sx={{ minWidth: minWidth }} size='small'>
      <InputLabel>{label}</InputLabel>
      <Select label={label} defaultValue={value} onChange={handleChange}>
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
