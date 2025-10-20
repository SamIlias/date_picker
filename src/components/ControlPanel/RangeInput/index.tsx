import { FC } from 'react';

import { DateInput } from '@/components/ControlPanel/DateInput';

import * as S from './styled';

interface RangeInputProps {
  from?: string;
  to?: string;
  onFromChange: (value: string | null) => void;
  onToChange: (value: string | null) => void;
}

export const RangeInput: FC<RangeInputProps> = ({ from, to, onFromChange, onToChange }) => {
  const handleClear = () => {
    onFromChange(null);
    onToChange(null);
  };

  return (
    <S.RangeInput>
      <DateInput value={from} onChange={onFromChange} htmlFor={'from-date'} label={'From'} />
      <DateInput value={to} onChange={onToChange} htmlFor={'to-date'} label={'To'} />
      <S.ClearButton onClick={handleClear} disabled={!from && !to}>
        {'Clear'}
      </S.ClearButton>
    </S.RangeInput>
  );
};
