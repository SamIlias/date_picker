import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { monthNames, Views } from '@/core/constants';
import { darkTheme } from '@/theme/theme';

import { MonthsCalendar } from './MonthsCalendar';

describe('MonthsCalendar', () => {
  const mockOnMonthSelect = jest.fn();
  const mockOnViewChange = jest.fn();

  const renderComponent = (props = {}) =>
    render(
      <ThemeProvider theme={darkTheme}>
        <MonthsCalendar
          currentMonth="March"
          selectedYear={2025}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
          {...props}
        />
      </ThemeProvider>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the selected year in the header', () => {
    renderComponent();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  test('calls onViewChange(Views.YEARS) when clicking on the year header', () => {
    renderComponent();
    fireEvent.click(screen.getByText('2025'));
    expect(mockOnViewChange).toHaveBeenCalledTimes(1);
    expect(mockOnViewChange).toHaveBeenCalledWith(Views.YEARS);
  });

  test('renders all 12 months', () => {
    renderComponent();
    const monthElements = monthNames.map((m) => screen.getByText(m));
    expect(monthElements).toHaveLength(12);
  });

  test('calls onMonthSelect with the correct month when clicked', () => {
    renderComponent();
    const march = screen.getByText('March');
    fireEvent.click(march);
    expect(mockOnMonthSelect).toHaveBeenCalledTimes(1);
    expect(mockOnMonthSelect).toHaveBeenCalledWith('March');
  });
});
