import { BaseCalendar } from '@/core/BaseCalendar';
import { TasksCalendarDecorator } from '@/core/decorators/TasksCalendarDecorator';

describe('TasksCalendarDecorator', () => {
  let baseCalendar: BaseCalendar;
  let decorator: TasksCalendarDecorator;
  let setErrorMessage: jest.Mock;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        store: {} as Record<string, string>,
        getItem(key: string) {
          return this.store[key] || null;
        },
        setItem(key: string, value: string) {
          this.store[key] = value;
        },
        clear() {
          this.store = {};
        },
      },
      writable: true,
    });

    baseCalendar = new BaseCalendar();
    decorator = new TasksCalendarDecorator(baseCalendar);
    setErrorMessage = jest.fn();
    decorator.clearAllTasks();
  });

  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  describe('addTask', () => {
    it('should add a task for a given date', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, 'Test Task', setErrorMessage);

      const tasks = decorator.getTasks(date);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].value).toBe('Test Task');
      expect(setErrorMessage).not.toHaveBeenCalled();
    });

    it('should trim task value', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, '   Trimmed Task   ', setErrorMessage);

      const tasks = decorator.getTasks(date);
      expect(tasks[0].value).toBe('Trimmed Task');
    });

    it('should not allow empty task', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, '  ', setErrorMessage);

      const tasks = decorator.getTasks(date);
      expect(tasks).toHaveLength(0);
      expect(setErrorMessage).toHaveBeenCalledWith('The field can not be empty');
    });

    it('should not allow duplicate task', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, 'Task 1', setErrorMessage);
      decorator.addTask(date, 'Task 1', setErrorMessage);

      const tasks = decorator.getTasks(date);
      expect(tasks).toHaveLength(1);
      expect(setErrorMessage).toHaveBeenCalledWith('The task already exists');
    });
  });

  describe('removeTask', () => {
    it('should remove a task', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, 'Task 1', setErrorMessage);
      const task = decorator.getTasks(date)[0];

      decorator.removeTask(date, task);
      expect(decorator.getTasks(date)).toHaveLength(0);
    });

    it('should do nothing if task does not exist', () => {
      const date = new Date(2024, 5, 10);
      decorator.removeTask(date, { id: 'nonexistent', value: 'Fake Task' });
      expect(decorator.getTasks(date)).toHaveLength(0);
    });
  });

  describe('getTasks', () => {
    it('should return empty array for date without tasks', () => {
      const date = new Date(2024, 5, 11);
      expect(decorator.getTasks(date)).toEqual([]);
    });
  });

  describe('clearAllTasks', () => {
    it('should clear all tasks', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, 'Task 1', setErrorMessage);
      decorator.clearAllTasks();

      expect(decorator.getTasks(date)).toHaveLength(0);
      expect(window.localStorage.getItem('calendarTasks')).toBe(JSON.stringify({}));
    });
  });

  describe('loadTasks and persistence', () => {
    it('should persist tasks to localStorage', () => {
      const date = new Date(2024, 5, 10);
      decorator.addTask(date, 'Task 1', setErrorMessage);

      const newDecorator = new TasksCalendarDecorator(baseCalendar);
      expect(newDecorator.getTasks(date)).toHaveLength(1);
      expect(newDecorator.getTasks(date)[0].value).toBe('Task 1');
    });
  });
});
