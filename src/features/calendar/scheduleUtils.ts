// Utility functions for expanding schedules
import type { TodoSchedule } from "@/types/todo";
import dayjs, { Dayjs } from "dayjs";

export function expandSchedule(
  schedule: TodoSchedule,
  monthStart: Dayjs,
  monthEnd: Dayjs,
) {
  const events: { start: Dayjs; end: Dayjs }[] = [];

  const { interval, starts_at, ends_at } = schedule;

  const start = dayjs(starts_at);
  const end = dayjs(ends_at);

  // once
  if (interval === "once") {
    if (start.isAfter(monthStart) && start.isBefore(monthEnd)) {
      events.push({ start, end });
    }
    return events;
  }

  // daily
  if (interval === "daily") {
    let day = monthStart;
    while (day.isBefore(monthEnd)) {
      const s = day
        .hour(start.hour())
        .minute(start.minute())
        .second(0)
        .millisecond(0);
      const e = day
        .hour(end.hour())
        .minute(end.minute())
        .second(0)
        .millisecond(0);
      events.push({ start: s, end: e });
      day = day.add(1, "day");
    }
    return events;
  }

  // weekly
  if (interval === "weekly") {
    const ref = dayjs("1970-01-05"); // Monday reference
    const dow = start.diff(ref, "day") % 7;

    let day = monthStart;
    while (day.isBefore(monthEnd)) {
      if (day.day() === (dow + 1) % 7) {
        const s = day
          .hour(start.hour())
          .minute(start.minute())
          .second(0)
          .millisecond(0);
        const e = day
          .hour(end.hour())
          .minute(end.minute())
          .second(0)
          .millisecond(0);
        events.push({ start: s, end: e });
      }
      day = day.add(1, "day");
    }
    return events;
  }

  // monthly
  if (interval === "monthly") {
    const targetDay = start.date();
    let d = monthStart.date(1);

    while (d.month() === monthStart.month()) {
      if (d.date() === targetDay) {
        const s = d
          .hour(start.hour())
          .minute(start.minute())
          .second(0)
          .millisecond(0);
        const e = d
          .hour(end.hour())
          .minute(end.minute())
          .second(0)
          .millisecond(0);
        events.push({ start: s, end: e });
      }
      d = d.add(1, "day");
    }
    return events;
  }

  return events;
}
