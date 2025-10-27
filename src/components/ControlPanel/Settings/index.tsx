import { ChangeEvent, FC } from 'react';

import { useContainerSize } from '@/context/SizeContext';
import { isView, isWeekStartsOn, Views, WeekStartsOn } from '@/core/constants';

import * as S from './styled';

interface SettingsProps {
  view: Views;
  weekStartsOn: WeekStartsOn;
  onViewChange: (view: Views) => void;
  onWeekStartsOnChange: (weekStartsOn: WeekStartsOn) => void;
}

export const Settings: FC<SettingsProps> = ({
  view,
  weekStartsOn,
  onViewChange,
  onWeekStartsOnChange,
}) => {
  const onViewSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isView(e.target.value)) onViewChange(e.target.value);
  };

  const onWeekStartsOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isWeekStartsOn(e.target.value)) onWeekStartsOnChange(e.target.value);
  };

  const containerSize = useContainerSize();

  return (
    <S.Settings>
      <S.SelectGroup $containerSize={containerSize}>
        <S.SelectContainer>
          <S.Label htmlFor="view-select">View</S.Label>
          <S.Select id="view-select" value={view} onChange={onViewSelect}>
            <option value={Views.WEEKS}>Weeks</option>
            <option value={Views.MONTHS}>Months</option>
            <option value={Views.YEARS}>Years</option>
          </S.Select>
        </S.SelectContainer>

        <S.SelectContainer>
          <S.Label htmlFor="week-starts-select">Week starts on</S.Label>
          <S.Select id="week-starts-select" value={weekStartsOn} onChange={onWeekStartsOnSelect}>
            <option value={WeekStartsOn.MONDAY}>Monday</option>
            <option value={WeekStartsOn.SUNDAY}>Sunday</option>
          </S.Select>
        </S.SelectContainer>
      </S.SelectGroup>
    </S.Settings>
  );
};
