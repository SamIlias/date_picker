import { ChangeEvent, FC } from 'react';

import * as S from './styled';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const DateInput: FC<DateInputProps> = ({ value, onChange, label = 'Select date' }) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <S.DateInput>
      <S.Label htmlFor="date-input">{label}</S.Label>
      <S.DateInputField id="date-input" value={value} onChange={onChangeInput} />
    </S.DateInput>
  );
};
