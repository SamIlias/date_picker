import { FC, useState } from 'react';

import { DateInput } from '@/components/ControlPanel/DateInput';
import { RangeInput } from '@/components/ControlPanel/RangeInput';
import { Settings } from '@/components/ControlPanel/Settings';
import { formatDateForInput, Views, WeekStartsOn } from '@/core/constants';

import * as S from './styled';

export type ControlPanelProps = {
  view: Views;
  onViewChange: (view: Views) => void;
  weekStartsOn: WeekStartsOn;
  onWeekStartsOnChange: (weekStartsOn: WeekStartsOn) => void;
  showWeekends: boolean;
  onShowWeekendsChange: (check: boolean) => void;
  showHolidays: boolean;
  onShowHolidaysChange: (check: boolean) => void;
  from: string;
  to: string;
  onFromChange: (value: string | null) => void;
  onToChange: (value: string | null) => void;
  selectedDate: Date;
  onDateInputPick: (value: string) => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  view,
  onViewChange,
  weekStartsOn,
  onWeekStartsOnChange,
  showWeekends,
  onShowWeekendsChange,
  showHolidays,
  onShowHolidaysChange,
  from,
  to,
  onFromChange,
  onToChange,
  onDateInputPick,
  selectedDate,
}) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(true);
  return (
    <S.ControlPanel>
      <S.ToggleButton onClick={() => setIsSettingsVisible((prev) => !prev)}>
        {isSettingsVisible ? 'Hide settings' : 'Show settings'}
      </S.ToggleButton>

      <S.AnimatedPanel $visible={isSettingsVisible}>
        <Settings
          view={view}
          onViewChange={onViewChange}
          weekStartsOn={weekStartsOn}
          onWeekStartsOnChange={onWeekStartsOnChange}
          showWeekends={showWeekends}
          onShowWeekendsChange={onShowWeekendsChange}
          showHolidays={showHolidays}
          onShowHolidaysChange={onShowHolidaysChange}
        />
        <RangeInput from={from} to={to} onFromChange={onFromChange} onToChange={onToChange} />

        <DateInput
          value={formatDateForInput(selectedDate)}
          onChange={onDateInputPick}
          label={'Select date'}
          htmlFor={'date-input'}
        />
      </S.AnimatedPanel>
    </S.ControlPanel>
  );
};
