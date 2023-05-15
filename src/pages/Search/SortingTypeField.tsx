import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { SortingTypes, getSortingTypeString } from '../../types/SearchTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '../../const';
import { removeEmptySearchParams } from '../../utils/utils';

interface SortingTypeFieldProps {
  minWidth: number;
}

const label = 'Sortuj według';

function SortingTypeField({ minWidth }: SortingTypeFieldProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const value =
    SortingTypes[searchParams.get(SEARCH_PARAMS.SORT_BY) as keyof typeof SortingTypes] ??
    SortingTypes.Popularity;

  const handleChange = (event: SelectChangeEvent<SortingTypes>) => {
    searchParams.set(SEARCH_PARAMS.SORT_BY, event.target.value);
    navigate({
      pathname: ROUTES.SEARCH,
      search: removeEmptySearchParams(searchParams).toString(),
    });
  };

  return (
    <FormControl sx={{ minWidth }} size='small'>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleChange}>
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
