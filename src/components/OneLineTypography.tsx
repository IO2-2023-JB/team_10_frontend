import { SxProps, Tooltip, Typography, TypographyProps } from '@mui/material';
import { ElementType, useRef } from 'react';
import { useMaxLines } from '../utils/hooks';

function OneLineTypography<C extends ElementType>(
  props: TypographyProps<C, { component?: C }>
) {
  const ref = useRef<HTMLElement | null>(null);
  const { isEllipsisActive, style } = useMaxLines(1, ref);

  const sx: SxProps = [...(Array.isArray(props.sx) ? props.sx : [props.sx]), style];

  return (
    <Tooltip title={isEllipsisActive ? props.children : null}>
      <Typography ref={ref} {...props} sx={sx} />
    </Tooltip>
  );
}

export default OneLineTypography;
