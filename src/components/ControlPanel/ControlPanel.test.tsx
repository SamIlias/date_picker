import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { Views, WeekStartsOn } from '@/core/constants';
import { darkTheme } from '@/theme/theme';

import { ControlPanel } from '.';

describe('ControlPanel', () => {
  const mockOnViewChange = jest.fn();
  const mockOnWeekStartsOnChange = jest.fn();
  const mockOnShowWeekendsChange = jest.fn();
  const mockOnShowHolidaysChange = jest.fn();
  const mockOnFromChange = jest.fn();
  const mockOnToChange = jest.fn();
  const mockOnDateInputPick = jest.fn();

  const renderComponent = (props = {}) => {
    render(
      <ThemeProvider theme={darkTheme}>
        <ControlPanel
          view={Views.WEEKS}
          onViewChange={mockOnViewChange}
          weekStartsOn={WeekStartsOn.MONDAY}
          onWeekStartsOnChange={mockOnWeekStartsOnChange}
          showWeekends={true}
          onShowWeekendsChange={mockOnShowWeekendsChange}
          showHolidays={false}
          onShowHolidaysChange={mockOnShowHolidaysChange}
          from="2025-01-01"
          to="2025-12-31"
          onFromChange={mockOnFromChange}
          onToChange={mockOnToChange}
          selectedDate={new Date(2025, 0, 1)}
          onDateInputPick={mockOnDateInputPick}
          {...props}
        />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('toggles settings panel visibility', () => {
    renderComponent();
    const toggleButton = screen.getByText(/Hide settings/i);
    expect(screen.getByText(/Select date/i)).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText(/Show settings/i)).toBeInTheDocument();
  });

  test('renders Settings, RangeInput, and DateInput', () => {
    renderComponent();
    expect(screen.getByLabelText(/View/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Week starts on/i)).toBeInTheDocument();
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Select date')).toBeInTheDocument();
  });

  test('interacts with Settings controls', () => {
    renderComponent();
    const viewSelect = screen.getByLabelText(/View/i);
    fireEvent.change(viewSelect, { target: { value: Views.MONTHS } });
    expect(mockOnViewChange).toHaveBeenCalledWith(Views.MONTHS);

    const weekSelect = screen.getByLabelText(/Week starts on/i);
    fireEvent.change(weekSelect, { target: { value: WeekStartsOn.SUNDAY } });
    expect(mockOnWeekStartsOnChange).toHaveBeenCalledWith(WeekStartsOn.SUNDAY);
  });

  test('interacts with RangeInput', () => {
    renderComponent();
    const fromInput = screen.getByLabelText('From');
    const toInput = screen.getByLabelText('To');
    fireEvent.change(fromInput, { target: { value: '2025-02-01' } });
    fireEvent.change(toInput, { target: { value: '2025-03-01' } });
    expect(mockOnFromChange).toHaveBeenCalledWith('2025-02-01');
    expect(mockOnToChange).toHaveBeenCalledWith('2025-03-01');
  });

  test('interacts with DateInput', () => {
    renderComponent();
    const dateInput = screen.getByLabelText('Select date');
    fireEvent.change(dateInput, { target: { value: '2025-06-01' } });
    expect(mockOnDateInputPick).toHaveBeenCalledWith('2025-06-01');
  });
});
