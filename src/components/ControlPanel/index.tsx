import { FC, useState } from 'react';

import { DateInput } from '@/components/ControlPanel/DateInput';
import { RangeInput } from '@/components/ControlPanel/RangeInput';
import { Settings } from '@/components/ControlPanel/Settings';
import { useContainerSize } from '@/context/SizeContext';
import { formatDateForInput, Views, WeekStartsOn } from '@/core/constants';

import * as S from './styled';

export type ControlPanelProps = {
  view: Views;
  onViewChange: (view: Views) => void;
  weekStartsOn: WeekStartsOn;
  onWeekStartsOnChange: (weekStartsOn: WeekStartsOn) => void;
  from: string;
  to: string;
  onFromChange: (value: string | null) => void;
  onToChange: (value: string | null) => void;
  selectedDate: Date;
  onDateInputPick: (value: string) => void;
  hasRangeFeature: boolean;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  view,
  onViewChange,
  weekStartsOn,
  onWeekStartsOnChange,
  from,
  to,
  onFromChange,
  onToChange,
  onDateInputPick,
  selectedDate,
  hasRangeFeature,
}) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(true);
  const containerSize = useContainerSize();

  return (
    <S.ControlPanel>
      <S.ToggleButton
        $containerSize={containerSize}
        onClick={() => setIsSettingsVisible((prev) => !prev)}
      >
        {isSettingsVisible ? 'Hide settings' : 'Show settings'}
      </S.ToggleButton>

      <S.AnimatedPanel $visible={isSettingsVisible}>
        <Settings
          view={view}
          onViewChange={onViewChange}
          weekStartsOn={weekStartsOn}
          onWeekStartsOnChange={onWeekStartsOnChange}
        />
        {hasRangeFeature && (
          <RangeInput from={from} to={to} onFromChange={onFromChange} onToChange={onToChange} />
        )}
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
