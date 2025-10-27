import styled from 'styled-components';

import { ContainerSize } from '@/context/SizeContext';

export const ExampleWrapper = styled.div`
  width: 300px;
`;

export type ContainerSizeProps = {
  $containerSize: ContainerSize;
};

export const AppWrapper = styled.div`
  background: ${({ theme }) => theme.color.background.primary};
  width: 100%;
`;
