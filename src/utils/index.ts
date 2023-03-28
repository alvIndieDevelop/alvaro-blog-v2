import { startOfYear, differenceInDays, getDaysInYear, format } from "date-fns";

export const readableDate = (dateString: string): string => {
  const toDate = new Date(dateString);
  return format(toDate, "dd-MMMM-yyyy");
};

export const getCurrentAge = (): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const birthYear = 1993;
  const currentAge = currentYear - birthYear;
  return Math.abs(currentAge);
};

export const getCurrentExperience = (): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const beginYear = 2019;
  const currentAge = currentYear - beginYear;
  return Math.abs(currentAge);
};

export const getPercentOfCurrentYear = (): number => {
  const currentDate = new Date();
  const firstDayOfYear = startOfYear(currentDate);
  const amountOfDays = differenceInDays(currentDate, firstDayOfYear);
  const totalDaysOfYear = getDaysInYear(currentDate);
  const getPercentOfYearPass = (amountOfDays / totalDaysOfYear) * 100;
  return +getPercentOfYearPass.toFixed(2);
};
