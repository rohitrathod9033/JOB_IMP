import dayjs from "dayjs";

export const starting = 9;
export const ending = 18;
export const slotsTime = 30;

export const generateSlots = (date: Date) => {
  const slots = [];

  let start = dayjs(date).hour(starting).minute(0).second(0);
  const end = dayjs(date).hour(ending).minute(0).second(0);

  while (start.add(slotsTime, "minute").isBefore(end.add(1, "minute"))) {
    const endTime = start.add(slotsTime, "minute");

    slots.push({
      start: start.toDate(),
      end: endTime.toDate(),
    });

    start = endTime;
  }

  return slots;
};
