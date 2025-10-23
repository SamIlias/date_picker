import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { ThemeProvider } from 'styled-components';

import { Views, WeekStartsOn } from '@/core/constants';
import { darkTheme } from '@/theme/theme';

import { YearsCalendar } from './YearsCalendar';

describe('YearsCalendar', () => {
  const mockOnYearSelect = jest.fn();
  const mockOnPrev = jest.fn();
  const mockOnNext = jest.fn();

  const createMockCalendar = () => ({
    getYearsForGrid: jest.fn(() => [2020, 2021, 2022, 2023, 2024, 2025, 2026]),
    config: {
      view: Views.YEARS,
      weekStartsOn: WeekStartsOn.MONDAY,
      showWeekends: true,
      holidays: [],
      features: [],
      minDate: null,
      maxDate: null,
    },
    getDaysForMonthGrid: jest.fn(),
    isToday: jest.fn(),
    isSameDay: jest.fn(),
    isInRange: jest.fn(),
    isOtherMonth: jest.fn(),
    isWeekend: jest.fn(),
    isHoliday: jest.fn(),
    isDateAllowed: jest.fn(),
    getTasks: jest.fn(),
    nextMonthDay: jest.fn(),
    prevMonthDay: jest.fn(),
  });

  const renderComponent = (props: Partial<ComponentProps<typeof YearsCalendar>> = {}) => {
    const calendar = createMockCalendar();

    render(
      <ThemeProvider theme={darkTheme}>
        <YearsCalendar
          calendar={calendar}
          pointedYear={2025}
          currentYear={2025}
          onYearSelect={mockOnYearSelect}
          onPrev={mockOnPrev}
          onNext={mockOnNext}
          {...props}
        />
      </ThemeProvider>,
    );

    return { calendar };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header title "Years"', () => {
    renderComponent();
    expect(screen.getByText('Years')).toBeInTheDocument();
  });

  test('renders years returned by calendar.getYearsForGrid()', () => {
    const { calendar } = renderComponent();
    expect(calendar.getYearsForGrid).toHaveBeenCalledWith(2025, 7);
    [2020, 2021, 2022, 2023, 2024, 2025, 2026].forEach((year) => {
      expect(screen.getByText(year.toString())).toBeInTheDocument();
    });
  });

  test('calls onYearSelect when a year cell is clicked', () => {
    renderComponent();
    const yearCell = screen.getByText('2024');
    fireEvent.click(yearCell);
    expect(mockOnYearSelect).toHaveBeenCalledWith(2024);
  });

  test('highlights current year cell', () => {
    renderComponent({ currentYear: 2025 });
    const currentCell = screen.getByText('2025');
    expect(currentCell).toBeInTheDocument();
  });

  test('calls onPrev when clicking previous button', () => {
    renderComponent();
    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  test('calls onNext when clicking next button', () => {
    renderComponent();
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });
});
