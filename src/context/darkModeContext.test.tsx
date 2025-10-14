import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DarkModeProvider, useDarkMode } from './darkModeContext';

const TestComponent = () => {
  const { isDark, toggleTheme } = useDarkMode();
  return (
    <div>
      <span data-testid="theme">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
};

describe('DarkModeProvider & useDarkMode', () => {
  it('throws the Error if context used outside the Provider', () => {
    const renderWithoutProvider = () => render(<TestComponent />);
    expect(renderWithoutProvider).toThrow('useDarkMode must be used within DarkModeProvider');
  });

  it('must toggles theme', async () => {
    render(
      <DarkModeProvider>
        <TestComponent />
      </DarkModeProvider>,
    );

    const theme = screen.getByTestId('theme');
    expect(theme).toHaveTextContent(/dark|light/);

    await userEvent.click(screen.getByText(/toggle/i));
    expect(theme).toHaveTextContent(/dark|light/);
  });
});
