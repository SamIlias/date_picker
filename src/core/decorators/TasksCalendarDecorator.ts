import { BaseCalendar } from '@/core/BaseCalendar';
import { ICalendar, Task } from '@/core/types';

import { BaseCalendarDecorator } from './BaseCalendarDecorator';

export class TasksCalendarDecorator extends BaseCalendarDecorator {
  private storageKey = 'calendarTasks';
  private tasks: Record<string, Task[]> = {};

  constructor(calendar: BaseCalendar) {
    super(calendar);
    this.loadTasks();
  }

  private getDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  public loadTasks(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.tasks = JSON.parse(data);
    }
  }

  private validateTask(date: Date, value: string): string | null {
    if (!value) return 'The field can not be empty';

    const key = this.getDateKey(date);
    const exists = this.tasks[key]?.some((t) => t.value === value);
    if (exists) return 'The task already exists';

    return null;
  }

  public addTask(date: Date, newTaskValue: string, setErrorMessage: (err: string) => void): void {
    const key = this.getDateKey(date);
    if (!this.tasks[key]) {
      this.tasks[key] = [];
    }

    const trimmed = newTaskValue.trim();

    const error = this.validateTask(date, trimmed);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      value: trimmed,
    };

    this.tasks[key].push(newTask);
    this.saveTasks();
  }

  public removeTask(date: Date, task: Task): void {
    const key = this.getDateKey(date);
    if (!this.tasks[key]) return;
    this.tasks[key] = this.tasks[key].filter((t) => t.id !== task.id);
    if (this.tasks[key].length === 0) delete this.tasks[key];
    this.saveTasks();
  }

  public getTasks(date: Date): Task[] {
    const key = this.getDateKey(date);
    return this.tasks[key] || [];
  }

  public clearAllTasks(): void {
    this.tasks = {};
    this.saveTasks();
  }
}

export function hasTasksFeature(calendar: ICalendar): calendar is TasksCalendarDecorator {
  return (
    'isInRange' in calendar &&
    typeof calendar.isInRange === 'function' &&
    'addTask' in calendar &&
    typeof calendar.addTask === 'function' &&
    'getTasks' in calendar &&
    typeof calendar.getTasks === 'function' &&
    'removeTask' in calendar &&
    typeof calendar.removeTask === 'function' &&
    'loadTasks' in calendar &&
    typeof calendar.loadTasks === 'function' &&
    'clearAllTasks' in calendar &&
    typeof calendar.clearAllTasks === 'function'
  );
}
