export const STANDARDS = [
  "1st", "2nd", "3rd", "4th", "5th", "6th",
  "7th", "8th", "9th", "10th", "11th", "12th",
] as const;

export type Standard = (typeof STANDARDS)[number];

export function isStandard(value: string): value is Standard {
  return (STANDARDS as readonly string[]).includes(value);
}
