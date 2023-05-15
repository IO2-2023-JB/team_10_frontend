import { Search } from '@mui/icons-material';
import { AutocompleteRenderInputParams, InputAdornment, TextField } from '@mui/material';

interface SearchInputProps {
  params: AutocompleteRenderInputParams;
}

function SearchInput({ params }: SearchInputProps) {
  return (
    <TextField
      {...params}
      variant='outlined'
      placeholder='Szukaj filmów, użytkowników, playlist…'
      InputProps={{
        ...params.InputProps,
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.09)',
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
      }}
    />
  );
}

export default SearchInput;
