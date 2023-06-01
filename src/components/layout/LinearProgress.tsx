import { LinearProgressProps, LinearProgress as MuiLinearProgress } from '@mui/material';

function LinearProgress(props: LinearProgressProps) {
  return (
    <MuiLinearProgress
      {...props}
      sx={{
        ...props.sx,
        height: 2,
        color: 'primary.main',
      }}
    />
  );
}

export default LinearProgress;
