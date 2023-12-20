export function formatDate(inputDate: Date | string): any {
  const currentDate: Date = new Date();
  const targetDate: Date = new Date(inputDate);
  if (targetDate.toString() === 'Invalid Date') {
    return inputDate;
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  // Check if the date is today
  if (
    targetDate.getDate() === currentDate.getDate() &&
    targetDate.getMonth() === currentDate.getMonth() &&
    targetDate.getFullYear() === currentDate.getFullYear()
  ) {
    return targetDate.toLocaleTimeString('en-US', timeOptions);
  }

  // Check if the date was yesterday
  const yesterday: Date = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (
    targetDate.getDate() === yesterday.getDate() &&
    targetDate.getMonth() === yesterday.getMonth() &&
    targetDate.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday at ${targetDate.toLocaleTimeString('en-US', timeOptions)}`;
  }

  // Check if the date is within the current week
  const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (currentDate.getTime() - targetDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return `${daysOfWeek[targetDate.getDay()]} at ${targetDate.toLocaleTimeString('en-US', timeOptions)}`;
  }

  // Date is more than a week ago
  return `${targetDate.toLocaleDateString('en-US')}`;
}
