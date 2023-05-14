import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SortingTypes, getSortingTypeString } from '../../types/SearchTypes';
import { useLocation } from 'react-router-dom';
import { SEARCH_PARAMS } from '../../const';

function handleChange() {
  console.log('type changed');
}

interface SortingTypeFieldProps {
  minWidth: number;
}

function SortingTypeField({ minWidth }: SortingTypeFieldProps) {
  const location = useLocation();
  const queryValue = new URLSearchParams(location.search).get(SEARCH_PARAMS.SORT_BY);
  const value = queryValue
    ? SortingTypes[queryValue as keyof typeof SortingTypes]
    : SortingTypes.Popularity;

  return (
    <FormControl sx={{ minWidth }} size='small'>
      <InputLabel>Sortuj według</InputLabel>
      <Select label='Typ sortowania' defaultValue={value} onChange={handleChange}>
        <MenuItem value={SortingTypes.Popularity}>
          {getSortingTypeString(SortingTypes.Popularity)}
        </MenuItem>
        <MenuItem value={SortingTypes.Alphabetical}>
          {getSortingTypeString(SortingTypes.Alphabetical)}
        </MenuItem>
        <MenuItem value={SortingTypes.PublishDate}>
          {getSortingTypeString(SortingTypes.PublishDate)}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortingTypeField;
