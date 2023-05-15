import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SortingDirections, getSortingDirectionString } from '../../types/SearchTypes';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_PARAMS } from '../../const';

interface SortingDirectionFieldProps {
  minWidth: number;
  search: (key: string, value?: string) => void;
}

const label = 'Typ sortowania';

function SortingDirectionField({ minWidth, search }: SortingDirectionFieldProps) {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get(SEARCH_PARAMS.SORT_DIRECTION);
  const value =
    SortingDirections[queryValue as keyof typeof SortingDirections] ??
    SortingDirections.Descending;

  const handleChange = (event: SelectChangeEvent<SortingDirections>) => {
    search(SEARCH_PARAMS.SORT_DIRECTION, event.target.value);
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
