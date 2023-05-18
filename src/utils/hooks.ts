import { SxProps } from '@mui/material';
import axios from 'axios';
import {
  RefObject,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export function useMaxLines(
  count: number,
  ref: RefObject<HTMLElement>
): {
  style: SxProps;
  isEllipsisActive: boolean;
} {
  const [isEllipsisActive, setIsEllipsisActive] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    setIsEllipsisActive(
      ref.current !== null && ref.current.offsetHeight < ref.current.scrollHeight
    );
  });

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

export const useLoadImage = (
  imageFile: string | null,
  imageSetter: (value: SetStateAction<Blob | null>) => void
) => {
  const isImageLoading = useRef<boolean>(false);
  return useCallback(async () => {
    if (isImageLoading.current === true) return;
    isImageLoading.current = true;
    const file =
      imageFile !== null
        ? (
            await axios.get<Blob>(imageFile, {
              responseType: 'blob',
            })
          ).data
        : null;

    imageSetter(file);
  }, [imageFile, imageSetter, isImageLoading]);
};
