import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { ContainerSize, SizeContext } from '@/context/SizeContext';
import { monthNames, Views, WeekStartsOn } from '@/core/constants';
import { darkTheme } from '@/theme/theme';

import { WeeksCalendar } from './WeeksCalendar';

describe('WeeksCalendar', () => {
  const mockOnDateSelect = jest.fn();
  const mockOnViewChange = jest.fn();
  const mockOnPrevMonth = jest.fn();
  const mockOnNextMonth = jest.fn();
  const mockOpenTasks = jest.fn();

  const baseDate = new Date(2025, 5, 15);

  const createMockCalendar = () => ({
    config: {
      view: Views.WEEKS,
      weekStartsOn: WeekStartsOn.MONDAY,
      showWeekends: true,
      holidays: [],
      features: [],
      minDate: null,
      maxDate: null,
    },
    getDaysForMonthGrid: jest.fn(() => [
      [new Date(2025, 5, 1), new Date(2025, 5, 2)],
      [new Date(2025, 5, 3), new Date(2025, 5, 4)],
    ]),
    isToday: jest.fn((date) => date.toDateString() === new Date().toDateString()),
    isSameDay: jest.fn((a, b) => a && b && a.toDateString() === b.toDateString()),
    isInRange: jest.fn(() => false),
    isOtherMonth: jest.fn(() => false),
    isWeekend: jest.fn(() => false),
    isHoliday: jest.fn(() => false),
    isDateAllowed: jest.fn(() => true),
    nextMonthDay: jest.fn(),
    prevMonthDay: jest.fn(),
    getYearsForGrid: jest.fn(),
  });

  const renderComponent = () => {
    const calendar = createMockCalendar();

    render(
      <ThemeProvider theme={darkTheme}>
        <SizeContext value={ContainerSize.COMPACT}>
          <WeeksCalendar
            calendar={calendar}
            pointedDate={baseDate}
            selectedDate={baseDate}
            holidays={[]}
            rangeStart={null}
            rangeEnd={null}
            weekStartsOn={WeekStartsOn.MONDAY}
            showWeekends={true}
            showHolidays={false}
            onDateSelect={mockOnDateSelect}
            openTasks={mockOpenTasks}
            onPrevMonth={mockOnPrevMonth}
            onNextMonth={mockOnNextMonth}
            onViewChange={mockOnViewChange}
          />
        </SizeContext>
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the header with month and year', () => {
    renderComponent();
    expect(screen.getByText(`${monthNames[5]} 2025`)).toBeInTheDocument();
  });

  test('calls onViewChange(Views.MONTHS) when clicking on the header', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/June 2025/));
    expect(mockOnViewChange).toHaveBeenCalledTimes(1);
    expect(mockOnViewChange).toHaveBeenCalledWith(Views.MONTHS);
  });

  test('calls onPrevMonth when clicking on the previous month button', () => {
    renderComponent();
    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);
    expect(mockOnPrevMonth).toHaveBeenCalledTimes(1);
  });

  test('calls onNextMonth when clicking on the next month button', () => {
    renderComponent();
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockOnNextMonth).toHaveBeenCalledTimes(1);
  });

  test('calls onDateSelect with correct date when a date cell is clicked', () => {
    renderComponent();
    const dateCell = screen.getByText('1');
    fireEvent.click(dateCell);
    expect(mockOnDateSelect).toHaveBeenCalledTimes(1);
    expect(mockOnDateSelect.mock.calls[0][0]).toBeInstanceOf(Date);
  });

  test('calls openTasks when a date cell is double-clicked', () => {
    renderComponent();
    const dateCell = screen.getByText('1');
    fireEvent.doubleClick(dateCell);
    expect(mockOpenTasks).toHaveBeenCalledTimes(1);
  });
});
