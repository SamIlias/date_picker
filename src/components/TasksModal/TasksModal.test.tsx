import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { TasksCalendarDecorator } from '@/core/decorators/TasksCalendarDecorator';
import { darkTheme } from '@/theme/theme';

import { TasksModal } from '.';

describe('TasksModal', () => {
  const date = new Date(2025, 9, 21);

  const createMockCalendar = () => ({
    getTasks: jest.fn(() => []),
    addTask: jest.fn((d, value, setError) => {
      if (!value.trim()) setError('The field can not be empty');
    }),
    removeTask: jest.fn(),
  });

  const mockOnClose = jest.fn();

  const renderComponent = (calendarOverridesMethods = {}) => {
    const calendar = { ...createMockCalendar(), ...calendarOverridesMethods };
    render(
      <ThemeProvider theme={darkTheme}>
        <TasksModal
          date={date}
          calendar={calendar as unknown as TasksCalendarDecorator}
          onClose={mockOnClose}
        />
      </ThemeProvider>,
    );
    return { calendar };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with date and empty message', () => {
    renderComponent();
    expect(screen.getByText(`Tasks for ${date.toLocaleDateString()}`)).toBeInTheDocument();
    expect(screen.getByText(/There are no tasks here/i)).toBeInTheDocument();
  });

  test('adds a new task when input is valid and Add button is clicked', () => {
    const { calendar } = renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i);
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addButton);

    expect(calendar.addTask).toHaveBeenCalledWith(date, 'New task', expect.any(Function));
  });

  test('shows error when input is empty or too long', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i);
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: ' ' } });
    fireEvent.click(addButton);
    expect(screen.getByText(/The field can not be empty/i)).toBeInTheDocument();
    expect(addButton).toBeDisabled();

    const longValue = 'a'.repeat(101);
    fireEvent.change(input, { target: { value: longValue } });
    expect(screen.getByText(/must be less than/i)).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  test('removes a task when remove button is clicked', () => {
    const task = { id: '1', value: 'Existing task' };
    const { calendar } = renderComponent({
      getTasks: jest.fn(() => [task]),
    });

    const removeButton = screen.getByText('✕');
    fireEvent.click(removeButton);
    expect(calendar.removeTask).toHaveBeenCalledWith(date, task);
  });

  test('calls onClose when close button is clicked', () => {
    renderComponent();
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
