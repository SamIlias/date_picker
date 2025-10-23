import { useErrorBoundaryReset } from '@/components/ErrorBoundary';
import * as S from '@/components/ErrorFallback/styled';

export function ErrorFallback({ error }: { error: Error }) {
  const reset = useErrorBoundaryReset();

  return (
    <S.Container role="alert">
      <S.Message>Oops! Something went wrong:</S.Message>
      <S.Message>{error.message}</S.Message>
      <S.RetryButton onClick={reset}>Try again</S.RetryButton>
    </S.Container>
  );
}
