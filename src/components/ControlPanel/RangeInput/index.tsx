import { FC } from 'react';

import { DateInput } from '@/components/ControlPanel/DateInput';
import { useContainerSize } from '@/context/SizeContext';

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

  const isDisabled = !from && !to;
  const containerSize = useContainerSize();

  return (
    <S.RangeInput $containerSize={containerSize}>
      <DateInput value={from} onChange={onFromChange} htmlFor={'from-date'} label={'From'} />
      <DateInput value={to} onChange={onToChange} htmlFor={'to-date'} label={'To'} />
      <S.ClearButton onClick={handleClear} disabled={isDisabled} $containerSize={containerSize}>
        {'Clear'}
      </S.ClearButton>
    </S.RangeInput>
  );
};
