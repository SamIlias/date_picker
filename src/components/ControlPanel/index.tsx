import { FC, ReactNode } from 'react';

import * as S from './styled';

export const ControlPanel: FC<{ children: ReactNode }> = ({ children }) => {
  return <S.ControlPanel>{children}</S.ControlPanel>;
};
