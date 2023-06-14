import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMobileLayout } from '../../theme';

interface DatePickerFilterProps {
  label: string;
  width: number;
  queryKey: string;
  search: (key: string, value?: string) => void;
  minDate: Date;
  maxDate: Date;
  setDate: (date: Date | null) => void;
}

function DatePickerFilter({
  label,
  width,
  queryKey,
  search,
  minDate,
  maxDate,
  setDate,
}: DatePickerFilterProps) {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get(queryKey);
  const { mobileQuery } = useMobileLayout();

  const handleChange = (value: Date | null) => {
    if (value) {
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
      if (value >= minDate && value <= maxDate) {
        setDate(value);
        search(queryKey, format(value, 'yyyy-MM-dd'));
      }
    }
  };

  useEffect(() => {
    setDate(queryValue ? new Date(queryValue) : null);
  }, [maxDate, queryValue, setDate]);

  return (
    <DatePicker
      orientation='portrait'
      minDate={minDate}
      maxDate={maxDate}
      label={label}
      value={queryValue ? new Date(queryValue) : null}
      onChange={handleChange}
      format='dd.MM.yyyy'
      slotProps={{
        textField: {
          size: 'small',
          sx: {
            width,
            [mobileQuery]: {
              width: 'auto',
            },
          },
        },
      }}
    />
  );
}

export default DatePickerFilter;
