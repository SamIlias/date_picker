import { ChangeEvent, FC } from 'react';

import { isView, isWeekStartsOn, Views, WeekStartsOn } from '@/core/constants';

import * as S from './styled';

interface SettingsProps {
  view: Views;
  weekStartsOn: WeekStartsOn;
  showHolidays: boolean;
  showWeekends: boolean;
  onViewChange: (view: Views) => void;
  onWeekStartsOnChange: (weekStartsOn: WeekStartsOn) => void;
  onShowHolidaysChange: (show: boolean) => void;
  onShowWeekendsChange: (show: boolean) => void;
}

export const Settings: FC<SettingsProps> = ({
  view,
  weekStartsOn,
  showHolidays,
  showWeekends,
  onViewChange,
  onWeekStartsOnChange,
  onShowHolidaysChange,
  onShowWeekendsChange,
}) => {
  const onViewSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isView(e.target.value)) onViewChange(e.target.value);
  };

  const onWeekStartsOnSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isWeekStartsOn(e.target.value)) onWeekStartsOnChange(e.target.value);
  };

  const onShowHolidaysCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    onShowHolidaysChange(e.target.checked);
  };

  const onShowWeekendsCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onShowWeekendsChange(e.target.checked);
  };

  return (
    <S.Settings>
      <S.SettingsRow>
        <S.SelectGroup>
          <S.Label htmlFor="view-select">View</S.Label>
          <S.Select id="view-select" value={view} onChange={onViewSelect}>
            <option value={Views.WEEKS}>Weeks</option>
            <option value={Views.MONTHS}>Months</option>
            <option value={Views.YEARS}>Years</option>
          </S.Select>
        </S.SelectGroup>

        <S.SelectGroup>
          <S.Label htmlFor="week-starts-select">Week starts on</S.Label>
          <S.Select id="week-starts-select" value={weekStartsOn} onChange={onWeekStartsOnSelect}>
            <option value={WeekStartsOn.MONDAY}>Monday</option>
            <option value={WeekStartsOn.SUNDAY}>Sunday</option>
          </S.Select>
        </S.SelectGroup>
      </S.SettingsRow>

      <S.CheckboxGroup>
        <S.CheckboxLabel>
          <S.Checkbox checked={showHolidays} onChange={onShowHolidaysCheck} />
          Show holidays
        </S.CheckboxLabel>

        <S.CheckboxLabel>
          <S.Checkbox checked={showWeekends} onChange={onShowWeekendsCheck} />
          Show weekends
        </S.CheckboxLabel>
      </S.CheckboxGroup>
    </S.Settings>
  );
};
