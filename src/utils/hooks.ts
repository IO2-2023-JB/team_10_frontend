import { SxProps } from '@mui/material';
import { RefObject, useLayoutEffect, useState } from 'react';

export function useMaxLines(
  count: number,
  ref: RefObject<HTMLElement>
): {
  style: SxProps;
  isEllipsisActive: boolean;
} {
  const [isEllipsisActive, setIsEllipsisActive] = useState<boolean>(false);

  useLayoutEffect(() => {
    setIsEllipsisActive(
      ref.current !== null && ref.current.offsetHeight < ref.current.scrollHeight
    );
  }, [ref]);

  return {
    style: {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitLineClamp: count,
      WebkitBoxOrient: 'vertical',
    },
    isEllipsisActive,
  };
}
