import { FC } from 'react';

import { MonthNames } from '@/core/types';

import * as S from './styled';

export interface CellProps {
  value: number | MonthNames;
  onClick: () => void;
  $isCurrent: boolean;
}

export const Cell: FC<CellProps> = ({ value, onClick, $isCurrent }) => {
  return (
    <S.Cell onClick={onClick} $isCurrent={$isCurrent}>
      {value}
    </S.Cell>
  );
};
