import { ListItem, ListItemButton, ListItemIcon, Radio } from '@mui/material';
import { ReactNode } from 'react';

interface OptionWrapperProps {
  onClick: () => void;
  checked: boolean;
  children: ReactNode;
}

function OptionWrapper({ onClick, checked, children }: OptionWrapperProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <Radio edge='start' checked={checked} disableRipple />
        </ListItemIcon>
        {children}
      </ListItemButton>
    </ListItem>
  );
}

export default OptionWrapper;
