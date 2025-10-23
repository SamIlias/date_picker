import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { useErrorBoundaryReset } from '@/components/ErrorBoundary';
import { darkTheme } from '@/theme/theme';

import { ErrorFallback } from '.';

jest.mock('@/components/ErrorBoundary', () => ({
  useErrorBoundaryReset: jest.fn(),
}));

describe('ErrorFallback', () => {
  it('shows the error message and resets', () => {
    const mockReset = jest.fn();
    (useErrorBoundaryReset as jest.Mock).mockReturnValue(mockReset);

    const error = new Error('Test error');
    render(
      <ThemeProvider theme={darkTheme}>
        <ErrorFallback error={error} />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Oops! Something went wrong:/)).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Try again/i));
    expect(mockReset).toHaveBeenCalled();
  });
});
