/**
 * Adds given number of days to current date
 * @param daysToAdd number of days to be added
 * @return {@link Date} of current date + daysToAdd
 */
export const addToCurrentDate = (daysToAdd: number): Date => {
  return new Date(Date.now() + daysToAdd * 3600 * 1000 * 24);
};

/**
 * Formats given date to string YYYYMMDDHHmm
 * @param date to be formatted
 * @return string in format YYYYMMDDHHmm
 */
export const formatDate = (date: Date): string => {
  return (
    `${date.getFullYear()}` +
    `${(date.getMonth() + 1).toString().padStart(2, '0')}` +
    `${date.getDate().toString().padStart(2, '0')}` +
    `${date.getHours().toString().padStart(2, '0')}` +
    `${date.getMinutes().toString().padStart(2, '0')}`
  );
};
