import { Button } from '@mui/material';
import { useSubscribe } from '../../api/subscription';
import { useState } from 'react';

interface SubscribeButtonProps {
  creatorId: string;
}

enum SubscribeButtonText {
  Subscribed = 'Subskrybujesz',
  Unsubscribe = 'Odsubskrybuj',
  Subscribe = 'Subskrybuj',
}

function SubscribeButton({ creatorId }: SubscribeButtonProps) {
  const { isSubscribed, handleSubscribe } = useSubscribe(creatorId);
  const [subscribedButtonText, setSubscribedText] = useState(
    SubscribeButtonText.Subscribed
  );

  return (
    <Button
      variant={isSubscribed ? 'outlined' : 'contained'}
      size='large'
      sx={{ marginInlineStart: 'auto' }}
      onClick={() => {
        handleSubscribe();
      }}
      onMouseOver={() => {
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
