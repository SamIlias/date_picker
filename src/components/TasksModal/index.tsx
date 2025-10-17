import { ChangeEvent, FC, useState } from 'react';

import { TasksCalendarDecorator } from '@/core/decorators/TasksCalendarDecorator';
import { Task } from '@/core/types';

import * as S from './styled';

const TASK_LENGTH = 10;

interface TasksModalProps {
  date: Date;
  calendar: TasksCalendarDecorator;
  onClose: () => void;
}

export const TasksModal: FC<TasksModalProps> = ({ date, calendar, onClose }) => {
  const [tasks, setTasks] = useState<Task[]>(calendar.getTasks(date));
  const [newTaskValue, setNewTaskValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTask = () => {
    calendar.addTask(date, newTaskValue, setErrorMessage);
    setTasks(calendar.getTasks(date));
    setNewTaskValue('');
  };

  const handleRemoveTask = (task: Task) => {
    calendar.removeTask(date, task);
    setTasks(calendar.getTasks(date));
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
              <S.RemoveButton onClick={() => handleRemoveTask(task)}>✕</S.RemoveButton>
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
        <S.ErrorMessage visible={!!errorMessage}>{errorMessage}</S.ErrorMessage>
      </S.Modal>
    </S.Overlay>
  );
};
