'use client';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';

interface CalenderProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDate?: Date[];
}
const Calender: React.FC<CalenderProps> = ({
  value,
  onChange,
  disabledDate,
}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDate}
    />
  );
};

export default Calender;
