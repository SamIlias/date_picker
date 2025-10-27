import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  test('renders modal with tasks list', () => {
    const tasks = [
      { id: '1', value: 'Task 1' },
      { id: '2', value: 'Task 2' },
    ];
    renderComponent({
      getTasks: jest.fn(() => tasks),
    });

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.queryByText(/There are no tasks here/i)).not.toBeInTheDocument();
  });

  test('adds a new task when input is valid and Add button is clicked', () => {
    const { calendar } = renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i);
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addButton);

    expect(calendar.addTask).toHaveBeenCalledWith(date, 'New task', expect.any(Function));
  });

  test('clears input after successfully adding a task', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i) as HTMLInputElement;
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New task' } });
    expect(input.value).toBe('New task');

    fireEvent.click(addButton);
    expect(input.value).toBe('');
  });

  test('shows error when input is empty', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i);
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/The field can not be empty/i)).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  test('shows error when input is too long', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i);
    const addButton = screen.getByText('Add');

    const longValue = 'a'.repeat(101);
    fireEvent.change(input, { target: { value: longValue } });

    expect(screen.getByText(/must be less than/i)).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  test('disables Add button when input is empty', () => {
    renderComponent();
    const addButton = screen.getByText('Add');

    expect(addButton).toBeDisabled();
  });

  test('enables Add button when input is valid', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/Add new task/i);
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Valid task' } });

    expect(addButton).not.toBeDisabled();
  });

  test('shows confirmation modal when remove button is clicked', () => {
    const task = { id: '1', value: 'Existing task' };
    renderComponent({
      getTasks: jest.fn(() => [task]),
    });

    const removeButton = screen.getByText('✕');
    fireEvent.click(removeButton);

    expect(screen.getByText(/Are you sure you want to delete this task/i)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('removes a task when confirm button is clicked in confirmation modal', () => {
    const task = { id: '1', value: 'Existing task' };
    const { calendar } = renderComponent({
      getTasks: jest.fn(() => [task]),
    });

    const removeButton = screen.getByText('✕');
    fireEvent.click(removeButton);

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(calendar.removeTask).toHaveBeenCalledWith(date, task);
  });

  test('closes confirmation modal when cancel button is clicked', async () => {
    const task = { id: '1', value: 'Existing task' };
    const { calendar } = renderComponent({
      getTasks: jest.fn(() => [task]),
    });

    const removeButton = screen.getByText('✕');
    fireEvent.click(removeButton);

    expect(screen.getByText(/Are you sure you want to delete this task/i)).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/Are you sure you want to delete this task/i),
      ).not.toBeInTheDocument();
    });

    expect(calendar.removeTask).not.toHaveBeenCalled();
  });

  test('does not remove task if confirmation is cancelled', () => {
    const task = { id: '1', value: 'Existing task' };
    const { calendar } = renderComponent({
      getTasks: jest.fn(() => [task]),
    });

    const removeButton = screen.getByText('✕');
    fireEvent.click(removeButton);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(calendar.removeTask).not.toHaveBeenCalled();
  });

  test('calls onClose when close button is clicked', () => {
    renderComponent();
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
