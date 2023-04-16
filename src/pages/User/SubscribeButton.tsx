import { Button } from '@mui/material';
import { useSubscribe } from '../../api/subscription';

interface SubscribeButtonProps {
  creatorId: string;
}

function SubscribeButton({ creatorId }: SubscribeButtonProps) {
  const { isSubscribed, handleSubscribe } = useSubscribe(creatorId);

  return (
    <Button
      variant={isSubscribed ? 'outlined' : 'contained'}
      size='large'
      sx={{ marginInlineStart: 'auto' }}
      onClick={() => {
        handleSubscribe();
      }}
    >
      {isSubscribed ? 'Subskrybujesz' : 'Subskrybuj'}
    </Button>
  );
}

export default SubscribeButton;
