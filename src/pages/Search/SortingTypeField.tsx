import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { SEARCH_PARAMS } from '../../const';
import { SortingTypes, getSortingTypeString } from '../../types/SearchTypes';

interface SortingTypeFieldProps {
  minWidth: number;
  search: (key: string, value?: string) => void;
}

const label = 'Sortuj według';

function SortingTypeField({ minWidth, search }: SortingTypeFieldProps) {
  const [searchParams] = useSearchParams();

  const value =
    SortingTypes[searchParams.get(SEARCH_PARAMS.SORT_BY) as keyof typeof SortingTypes] ??
    SortingTypes.BestMatch;

  const handleChange = (event: SelectChangeEvent<SortingTypes>) => {
    search(SEARCH_PARAMS.SORT_BY, event.target.value);
  };

  return (
    <FormControl sx={{ minWidth }} size='small'>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleChange}>
        <MenuItem value={SortingTypes.BestMatch}>
          {getSortingTypeString(SortingTypes.BestMatch)}
        </MenuItem>
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
