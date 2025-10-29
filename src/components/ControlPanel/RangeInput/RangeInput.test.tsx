import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { ThemeProvider } from 'styled-components';

import { ContainerSize, SizeContext } from '@/context/SizeContext';
import { darkTheme } from '@/theme/theme';

import { RangeInput } from '.';

describe('RangeInput', () => {
  const mockOnFromChange = jest.fn();
  const mockOnToChange = jest.fn();

  const renderComponent = (props: Partial<ComponentProps<typeof RangeInput>> = {}) => {
    render(
      <ThemeProvider theme={darkTheme}>
        <SizeContext value={ContainerSize.COMPACT}>
          <RangeInput
            from="2025-01-01"
            to="2025-12-31"
            onFromChange={mockOnFromChange}
            onToChange={mockOnToChange}
            {...props}
          />
        </SizeContext>
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders both "From" and "To" date inputs', () => {
    renderComponent();
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
  });

  test('renders provided "from" and "to" values', () => {
    renderComponent();
    const fromInput = screen.getByLabelText('From') as HTMLInputElement;
    const toInput = screen.getByLabelText('To') as HTMLInputElement;
    expect(fromInput.value).toBe('2025-01-01');
    expect(toInput.value).toBe('2025-12-31');
  });

  test('calls onFromChange when "From" input changes', () => {
    renderComponent();
    const fromInput = screen.getByLabelText('From');
    fireEvent.change(fromInput, { target: { value: '2025-02-15' } });
    expect(mockOnFromChange).toHaveBeenCalledWith('2025-02-15');
  });

  test('calls onToChange when "To" input changes', () => {
    renderComponent();
    const toInput = screen.getByLabelText('To');
    fireEvent.change(toInput, { target: { value: '2025-05-20' } });
    expect(mockOnToChange).toHaveBeenCalledWith('2025-05-20');
  });

  test('calls onFromChange(null) and onToChange(null) when "Clear" button is clicked', () => {
    renderComponent();
    const clearButton = screen.getByRole('button', { name: 'Clear' });
    fireEvent.click(clearButton);
    expect(mockOnFromChange).toHaveBeenCalledWith(null);
    expect(mockOnToChange).toHaveBeenCalledWith(null);
  });

  test('disables "Clear" button when both "from" and "to" are empty', () => {
    renderComponent({ from: undefined, to: undefined });
    const clearButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearButton).toBeDisabled();
  });

  test('enables "Clear" button when at least one value exists', () => {
    renderComponent({ from: '2025-03-01', to: undefined });
    const clearButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearButton).not.toBeDisabled();
  });
});
