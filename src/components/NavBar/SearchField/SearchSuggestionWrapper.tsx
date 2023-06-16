import { Box } from '@mui/material';
import {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';
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

  const handleClick = (event: ReactMouseEvent<HTMLLIElement, MouseEvent>) => {
    navigate(url);
    componentProps.onClick?.(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') {
      navigate(url);
    }
  };

  return (
    <Box
      component='li'
      {...componentProps}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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
