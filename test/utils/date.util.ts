import dayjs from "dayjs";

function getFormattedDate(
  {
    offsetDays = 0,
    format = "MM-DD-YYYY",
  }: {
    offsetDays?: number;
    format?: string;
  } = {
    offsetDays: 5,
    format: "MM-DD-YYYY",
  }
): string {
  return dayjs().add(offsetDays, "day").format(format);
}

export { getFormattedDate };
