import { useState } from 'react';
import { SEARCH_PARAMS } from '../../const';
import DatePickerFilter from './DatePickerFilter';

const minDate = new Date('1970-01-01');
const maxDate = new Date();

interface DateRangePickerProps {
  minWidth: number;
  search: (key: string, value?: string) => void;
}

function DateRangePicker({ minWidth: width, search }: DateRangePickerProps) {
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <>
      <DatePickerFilter
        width={width}
        label='Dodano po'
        queryKey={SEARCH_PARAMS.START_DATE}
        search={search}
        minDate={minDate}
        maxDate={endDate ?? maxDate}
        setDate={setBeginDate}
      />
      <DatePickerFilter
        width={width}
        label='Dodano przed'
        queryKey={SEARCH_PARAMS.END_DATE}
        search={search}
        minDate={beginDate ?? minDate}
        maxDate={maxDate}
        setDate={setEndDate}
      />
    </>
  );
}

export default DateRangePicker;
