import { ChangeEvent, FC } from 'react';

import * as S from './styled';

interface RangeInputProps {
  from?: string;
  to?: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export const RangeInput: FC<RangeInputProps> = ({ from, to, onFromChange, onToChange }) => {
  const onFromChangeCallback = (e: ChangeEvent<HTMLInputElement>) => onFromChange(e.target.value);
  const onToChangeCallback = (e: ChangeEvent<HTMLInputElement>) => onToChange(e.target.value);

  return (
    <S.RangeInput>
      <S.DateInputGroup>
        <S.Label htmlFor="from-date">From</S.Label>
        <S.DateInputField type="date" id="from-date" value={from} onChange={onFromChangeCallback} />
      </S.DateInputGroup>

      <S.DateInputGroup>
        <S.Label htmlFor="to-date">To</S.Label>
        <S.DateInputField id="to-date" value={to} onChange={onToChangeCallback} />
      </S.DateInputGroup>
    </S.RangeInput>
  );
};
