import { startOfYear, differenceInDays, getDaysInYear } from "date-fns";

export const readableDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString();

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
