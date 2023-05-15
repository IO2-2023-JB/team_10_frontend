import { Box } from '@mui/material';
import { HTMLAttributes, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SearchSuggestionWrapperProps {
  componentProps: HTMLAttributes<HTMLLIElement>;
  url: string;
  children: ReactNode;
}

function SearchSuggestionWrapper({
  componentProps,
  url,
  children,
}: SearchSuggestionWrapperProps) {
  const navigate = useNavigate();

  return (
    <Box
      component='li'
      {...componentProps}
      onClick={(event) => {
        navigate(url);
        componentProps.onClick?.(event);
      }}
    >
      <Box
        component={Link}
        to={url}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default SearchSuggestionWrapper;
