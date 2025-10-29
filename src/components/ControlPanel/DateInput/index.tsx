import { ChangeEvent, FC, useRef } from 'react';

import * as S from './styled';

interface DateInputProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  htmlFor: string;
}

export const DateInput: FC<DateInputProps> = ({
  value,
  onChange,
  label = 'Select date',
  htmlFor,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.showPicker?.();
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <S.DateInput>
      <S.Label htmlFor={htmlFor}>{label}</S.Label>
      <S.DateInputField
        ref={inputRef}
        onClick={handleClick}
        id={htmlFor}
        value={value}
        onChange={onChangeInput}
      />
    </S.DateInput>
  );
};
