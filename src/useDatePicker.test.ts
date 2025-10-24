import { act, renderHook } from '@testing-library/react';

import { monthNames, Views, WeekStartsOn } from '@/core/constants';
import { ICalendar } from '@/core/types';

import { useDataPicker } from './useDataPicker';

const mockCalendar = {
  config: {
    view: Views.WEEKS,
    weekStartsOn: WeekStartsOn.MONDAY,
    showWeekends: true,
    holidays: [],
  },
  nextMonthDay: (date: Date) => {
    const next = new Date(date);
    next.setMonth(next.getMonth() + 1);
    return next;
  },
  prevMonthDay: (date: Date) => {
    const prev = new Date(date);
    prev.setMonth(prev.getMonth() - 1);
    return prev;
  },
} as unknown as jest.Mocked<ICalendar>;

describe('useDataPicker', () => {
  it('initializes with current date if customDate is not provided', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));
    const today = new Date();
    expect(result.current.selectedDate.getFullYear()).toBe(today.getFullYear());
  });

  it('uses customDate when provided', () => {
    const date = new Date('2025-05-10');
    const { result } = renderHook(() => useDataPicker(mockCalendar, date));
    expect(result.current.selectedDate.toISOString()).toBe(date.toISOString());
  });

  it('calls customCallback when a date is selected', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDataPicker(mockCalendar, undefined, callback));

    const newDate = new Date('2025-07-01');
    act(() => result.current.onDateSelect(newDate));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(newDate);
  });

  it('increments and decrements the pointed year', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    const initialYear = result.current.pointedYear;
    act(() => result.current.onNextYearClick());
    expect(result.current.pointedYear).toBe(initialYear + 1);

    act(() => result.current.onPrevYearClick());
    expect(result.current.pointedYear).toBe(initialYear);
  });

  it('moves to next and previous months correctly', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    const initialMonth = result.current.pointedDate.getMonth();
    act(() => result.current.onNextMonthClick());
    expect(result.current.pointedDate.getMonth()).toBe((initialMonth + 1) % 12);

    act(() => result.current.onPrevMonthClick());
    expect(result.current.pointedDate.getMonth()).toBe(initialMonth);
  });

  it('sets date range correctly', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    act(() => result.current.onStartRangePick('2025-05-10'));
    act(() => result.current.onEndRangePick('2025-05-15'));

    expect(result.current.rangeStart).toEqual(new Date('2025-05-10'));
    expect(result.current.rangeEnd).toEqual(new Date('2025-05-15'));
  });

  it('swaps rangeStart and rangeEnd if picked in reverse order', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    act(() => result.current.onStartRangePick('2025-05-20'));
    act(() => result.current.onEndRangePick('2025-05-10'));

    expect(result.current.rangeStart).toEqual(new Date('2025-05-10'));
    expect(result.current.rangeEnd).toEqual(new Date('2025-05-20'));
  });

  it('resets date range when null values are provided', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    act(() => result.current.onStartRangePick('2025-05-10'));
    act(() => result.current.onEndRangePick('2025-05-15'));
    act(() => result.current.onStartRangePick(null));
    act(() => result.current.onEndRangePick(null));

    expect(result.current.rangeStart).toBeNull();
    expect(result.current.rangeEnd).toBeNull();
  });

  it('opens and closes tasks modal', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    act(() => result.current.openTasksModal());
    expect(result.current.isModalOpen).toBe(true);

    act(() => result.current.closeTasksModal());
    expect(result.current.isModalOpen).toBe(false);
  });

  it('switches to month view when a year is selected', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    act(() => result.current.onYearSelect(2025));
    expect(result.current.view).toBe(Views.MONTHS);
    expect(result.current.selectedYear).toBe(2025);
  });

  it('sets pointedDate correctly when a month is selected', () => {
    const { result } = renderHook(() => useDataPicker(mockCalendar));

    const targetMonth = monthNames[7];
    act(() => result.current.onMonthSelect(targetMonth));

    expect(result.current.pointedDate.getMonth()).toBe(7);
    expect(result.current.view).toBe(Views.WEEKS);
  });

  it('updates date and triggers callback when input value is picked', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDataPicker(mockCalendar, undefined, callback));

    act(() => result.current.onDateInputPick('2025-08-01'));
    expect(result.current.selectedDate.toISOString()).toBe(new Date('2025-08-01').toISOString());
    expect(callback).toHaveBeenCalledWith(new Date('2025-08-01'));
  });
});
