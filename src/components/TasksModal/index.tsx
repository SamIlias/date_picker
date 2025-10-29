import { ChangeEvent, FC, useState } from 'react';

import { TasksCalendarDecorator } from '@/core/decorators/TasksCalendarDecorator';
import { Task } from '@/core/types';

import * as S from './styled';

const TASK_LENGTH = 20;

interface TasksModalProps {
  date: Date;
  calendar: TasksCalendarDecorator;
  onClose: () => void;
}

export const TasksModal: FC<TasksModalProps> = ({ date, calendar, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>(calendar.getTasks(date));
  const [newTaskValue, setNewTaskValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [taskToRemove, setTaskToRemove] = useState<Task | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleAddTask = () => {
    calendar.addTask(date, newTaskValue, setErrorMessage);
    setTasks(calendar.getTasks(date));
    setNewTaskValue('');
  };

  const handleRequestRemove = (task: Task) => {
    setTaskToRemove(task);
    setShowConfirm(true);
  };

  const handleConfirmRemove = () => {
    if (taskToRemove) {
      calendar.removeTask(date, taskToRemove);
      setTasks(calendar.getTasks(date));
      setShowConfirm(false);
      setTaskToRemove(null);
    }
  };

  const handleCancelRemove = () => {
    setShowConfirm(false);
    setTaskToRemove(null);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskValue(e.target.value);
    if (e.target.value.length > TASK_LENGTH) {
      setErrorMessage(`The task length must be less than ${TASK_LENGTH}`);
    } else if (e.target.value.trim().length === 0) {
      setErrorMessage(`The field can not be empty`);
    } else {
      setErrorMessage('');
    }
  };

  return (
    <S.Overlay>
      <S.Modal>
        <S.Header>
          <h2>Tasks for {date.toLocaleDateString()}</h2>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.Header>

        <S.TaskList>
          {tasks.length === 0 && <S.EmptyText>There are no tasks here. Add new one!</S.EmptyText>}
          {tasks.map((task) => (
            <S.TaskItem key={task.id}>
              <span>{task.value}</span>
              <S.RemoveButton onClick={() => handleRequestRemove(task)}>✕</S.RemoveButton>
            </S.TaskItem>
          ))}
        </S.TaskList>

        <S.NewTaskSection>
          <S.TaskInput
            type="text"
            value={newTaskValue}
            onChange={onChangeInput}
            placeholder="Add new task..."
          />
          <S.AddButton
            disabled={!!errorMessage || newTaskValue.trim().length === 0}
            onClick={handleAddTask}
          >
            Add
          </S.AddButton>
        </S.NewTaskSection>
        <S.ErrorMessage isVisible={!!errorMessage}>{errorMessage}</S.ErrorMessage>
      </S.Modal>

      {showConfirm && (
        <S.ConfirmOverlay>
          <S.ConfirmModal>
            <p>Are you sure you want to delete this task?</p>
            <S.ConfirmActions>
              <S.CancelButton onClick={handleCancelRemove}>Cancel</S.CancelButton>
              <S.ConfirmButton onClick={handleConfirmRemove}>Confirm</S.ConfirmButton>
            </S.ConfirmActions>
          </S.ConfirmModal>
        </S.ConfirmOverlay>
      )}
    </S.Overlay>
  );
};
