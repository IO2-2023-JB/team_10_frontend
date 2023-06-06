import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useMobileLayout } from '../../theme';

interface DatePickerFilterProps {
  label: string;
  width: number;
  queryKey: string;
  search: (key: string, value?: string) => void;
}

const minDate = new Date('1970-01-01');
const maxDate = new Date();

function DatePickerFilter({ label, width, queryKey, search }: DatePickerFilterProps) {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get(queryKey);

  const { mobileQuery } = useMobileLayout();

  const handleChange = (value: Date | null) => {
    if (value && value >= minDate && value <= maxDate)
      search(queryKey, format(value, 'yyyy-MM-dd'));
  };

  return (
    <DatePicker
      orientation='portrait'
      minDate={minDate}
      maxDate={maxDate}
      label={label}
      value={queryValue ? new Date(queryValue) : null}
      onChange={handleChange}
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
