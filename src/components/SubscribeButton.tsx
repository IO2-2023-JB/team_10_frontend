import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useSubscribe } from '../api/subscription';

enum SubscribeButtonText {
  Subscribed = 'Subskrybujesz',
  Unsubscribe = 'Odsubskrybuj',
  Subscribe = 'Subskrybuj',
}

interface SubscribeButtonProps {
  creatorId: string;
  asMenuItem?: boolean;
}

function SubscribeButton({ creatorId, asMenuItem = false }: SubscribeButtonProps) {
  const { isSubscribed, handleSubscribe } = useSubscribe(creatorId);
  const [subscribedButtonText, setSubscribedText] = useState(
    SubscribeButtonText.Subscribed
  );

  if (asMenuItem) {
    return (
      <MenuItem onClick={handleSubscribe}>
        {isSubscribed ? SubscribeButtonText.Unsubscribe : SubscribeButtonText.Subscribe}
      </MenuItem>
    );
  }

  return (
    <Button
      variant={isSubscribed ? 'outlined' : 'contained'}
      size='large'
      sx={{ marginInlineStart: 'auto' }}
      onClick={handleSubscribe}
      onMouseEnter={() => {
        setSubscribedText(SubscribeButtonText.Unsubscribe);
      }}
      onMouseLeave={() => {
        setSubscribedText(SubscribeButtonText.Subscribed);
      }}
    >
      {isSubscribed ? subscribedButtonText : SubscribeButtonText.Subscribe}
    </Button>
  );
}

export default SubscribeButton;
