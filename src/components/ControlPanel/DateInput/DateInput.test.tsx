import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme } from '@/theme/theme';

import { DateInput } from '.';

describe('DateInput', () => {
  const mockOnChange = jest.fn();

  const renderComponent = (props: Partial<ComponentProps<typeof DateInput>> = {}) => {
    render(
      <ThemeProvider theme={darkTheme}>
        <DateInput htmlFor="date-input" value="2025-10-21" onChange={mockOnChange} {...props} />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders label and input with default label text', () => {
    renderComponent();
    expect(screen.getByLabelText('Select date')).toBeInTheDocument();
  });

  test('renders custom label text if provided', () => {
    renderComponent({ label: 'Pick a day' });
    expect(screen.getByLabelText('Pick a day')).toBeInTheDocument();
  });

  test('renders input with provided value', () => {
    renderComponent({ value: '2025-12-25' });
    const input = screen.getByLabelText('Select date') as HTMLInputElement;
    expect(input.value).toBe('2025-12-25');
  });

  test('calls onChange with new value when user changes input', () => {
    renderComponent();
    const input = screen.getByLabelText('Select date');
    fireEvent.change(input, { target: { value: '2025-11-10' } });
    expect(mockOnChange).toHaveBeenCalledWith('2025-11-10');
  });

  test('calls input.showPicker() when clicking on the input', () => {
    renderComponent();
    const input = screen.getByLabelText('Select date') as HTMLInputElement;
    const showPickerMock = jest.fn();
    input.showPicker = showPickerMock;
    fireEvent.click(input);
    expect(showPickerMock).toHaveBeenCalled();
  });
});
