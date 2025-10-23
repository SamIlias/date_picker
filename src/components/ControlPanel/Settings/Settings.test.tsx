import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { Views, WeekStartsOn } from '@/core/constants';
import { darkTheme } from '@/theme/theme';

import { Settings } from '.';

describe('Settings', () => {
  const mockOnViewChange = jest.fn();
  const mockOnWeekStartsOnChange = jest.fn();
  const mockOnShowHolidaysChange = jest.fn();
  const mockOnShowWeekendsChange = jest.fn();

  const renderComponent = (props = {}) => {
    render(
      <ThemeProvider theme={darkTheme}>
        <Settings
          view={Views.WEEKS}
          weekStartsOn={WeekStartsOn.MONDAY}
          showHolidays={false}
          showWeekends={true}
          onViewChange={mockOnViewChange}
          onWeekStartsOnChange={mockOnWeekStartsOnChange}
          onShowHolidaysChange={mockOnShowHolidaysChange}
          onShowWeekendsChange={mockOnShowWeekendsChange}
          {...props}
        />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('changes view when select value changes', () => {
    renderComponent();
    const viewSelect = screen.getByLabelText('View');
    fireEvent.change(viewSelect, { target: { value: Views.MONTHS } });
    expect(mockOnViewChange).toHaveBeenCalledWith(Views.MONTHS);
  });

  test('changes week start day when select value changes', () => {
    renderComponent();
    const weekSelect = screen.getByLabelText('Week starts on');
    fireEvent.change(weekSelect, { target: { value: WeekStartsOn.SUNDAY } });
    expect(mockOnWeekStartsOnChange).toHaveBeenCalledWith(WeekStartsOn.SUNDAY);
  });

  test('toggles show holidays checkbox', () => {
    renderComponent();
    const holidaysCheckbox = screen.getByRole('checkbox', { name: /Show holidays/i });
    fireEvent.click(holidaysCheckbox);
    expect(mockOnShowHolidaysChange).toHaveBeenCalledWith(true);
  });

  test('toggles show weekends checkbox', () => {
    renderComponent();
    const weekendsCheckbox = screen.getByRole('checkbox', { name: /Show weekends/i });
    fireEvent.click(weekendsCheckbox);
    expect(mockOnShowWeekendsChange).toHaveBeenCalledWith(false);
  });
});
