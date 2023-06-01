import { Search } from '@mui/icons-material';
import {
  AutocompleteRenderInputParams,
  Button,
  InputAdornment,
  TextField,
} from '@mui/material';

interface SearchInputProps {
  params: AutocompleteRenderInputParams;
  showButton: boolean;
  onSubmit: () => void;
}

function SearchInput({ params, showButton, onSubmit }: SearchInputProps) {
  return (
    <TextField
      {...params}
      variant='outlined'
      placeholder='Szukaj filmów, użytkowników, grajlist…'
      InputProps={{
        ...params.InputProps,
        sx: {
          backgroundColor: 'background.semiTransparent',
          '&:not(.Mui-focused)': {
            borderColor: 'transparent',
            '& fieldset': { borderColor: 'transparent' },
          },
        },
        startAdornment: (
          <InputAdornment position='start' sx={{ marginLeft: 1 }}>
            <Search />
          </InputAdornment>
        ),
        endAdornment: showButton ? (
          <InputAdornment position='end'>
            <Button onClick={onSubmit}>Szukaj</Button>
          </InputAdornment>
        ) : null,
      }}
    />
  );
}

export default SearchInput;
