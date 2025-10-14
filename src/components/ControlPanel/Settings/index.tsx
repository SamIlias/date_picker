import { FC } from 'react';

import { ViewType, WeekStartsOn } from '@/core/types';

import * as S from './styled';

interface SettingsProps {
  view: ViewType;
  weekStartsOn: WeekStartsOn;
  showHolidays: boolean;
  showWeekends: boolean;
  onViewChange: (view: ViewType) => void;
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
  return (
    <S.Settings>
      <S.SettingsRow>
        <S.SelectGroup>
          <S.Label htmlFor="view-select">View</S.Label>
          <S.Select
            id="view-select"
            value={view}
            onChange={(e) => onViewChange(e.target.value as ViewType)}
          >
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </S.Select>
        </S.SelectGroup>

        <S.SelectGroup>
          <S.Label htmlFor="week-starts-select">Week starts on</S.Label>
          <S.Select
            id="week-starts-select"
            value={weekStartsOn}
            onChange={(e) => onWeekStartsOnChange(e.target.value as WeekStartsOn)}
          >
            <option value="monday">Monday</option>
            <option value="sunday">Sunday</option>
          </S.Select>
        </S.SelectGroup>
      </S.SettingsRow>

      <S.CheckboxGroup>
        <S.CheckboxLabel>
          <S.Checkbox
            checked={showHolidays}
            onChange={(e) => onShowHolidaysChange(e.target.checked)}
          />
          Show holidays
        </S.CheckboxLabel>

        <S.CheckboxLabel>
          <S.Checkbox
            checked={showWeekends}
            onChange={(e) => onShowWeekendsChange(e.target.checked)}
          />
          Show weekends
        </S.CheckboxLabel>
      </S.CheckboxGroup>
    </S.Settings>
  );
};
