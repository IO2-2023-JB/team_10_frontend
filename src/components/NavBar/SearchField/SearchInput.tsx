import { Search } from '@mui/icons-material';
import {
  AutocompleteRenderInputParams,
  Button,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMobileLayout } from '../../../theme';

interface SearchInputProps {
  params: AutocompleteRenderInputParams;
  showButton: boolean;
  onSubmit: () => void;
}

function SearchInput({ params, showButton, onSubmit }: SearchInputProps) {
  const { isMobile } = useMobileLayout();

  return (
    <TextField
      {...params}
      variant='outlined'
      placeholder={isMobile ? 'Szukaj' : 'Szukaj filmów, użytkowników, grajlist…'}
      InputProps={{
        ...params.InputProps,
        size: isMobile ? 'small' : undefined,
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
