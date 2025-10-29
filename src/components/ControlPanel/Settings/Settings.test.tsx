import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { ContainerSize, SizeContext } from '@/context/SizeContext';
import { Views, WeekStartsOn } from '@/core/constants';
import { darkTheme } from '@/theme/theme';

import { Settings } from '.';

describe('Settings', () => {
  const mockOnViewChange = jest.fn();
  const mockOnWeekStartsOnChange = jest.fn();

  const renderComponent = (props = {}) => {
    render(
      <ThemeProvider theme={darkTheme}>
        <SizeContext value={ContainerSize.COMPACT}>
          <Settings
            view={Views.WEEKS}
            weekStartsOn={WeekStartsOn.MONDAY}
            onViewChange={mockOnViewChange}
            onWeekStartsOnChange={mockOnWeekStartsOnChange}
            {...props}
          />
        </SizeContext>
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
});
