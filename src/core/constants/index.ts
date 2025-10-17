export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const weekDaysStartsMonday = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const weekDaysStartsSunday = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const formatDateForInput = (date: Date | null) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const holidaysBel: Date[] = [
  new Date(2025, 0, 1),
  new Date(2025, 0, 2),
  new Date(2025, 0, 7),
  new Date(2025, 2, 8),
  new Date(2025, 3, 29),
  new Date(2025, 4, 1),
  new Date(2025, 4, 9),
  new Date(2025, 6, 3),
  new Date(2025, 10, 7),
  new Date(2025, 11, 25),
];
