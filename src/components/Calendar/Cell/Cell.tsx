import { useContainerSize } from '@/context/SizeContext';

import * as S from './styled';

export interface CellProps<T> {
  value: T;
  onClick: (value: T) => void;
  $isCurrent: boolean;
}

export function Cell<T>({ value, onClick, $isCurrent }: CellProps<T>) {
  const handleClick = () => {
    onClick(value);
  };

  const containerSize = useContainerSize();

  return (
    <S.Cell $containerSize={containerSize} onClick={handleClick} $isCurrent={$isCurrent}>
      {String(value)}
    </S.Cell>
  );
}
