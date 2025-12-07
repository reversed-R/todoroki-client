import { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { expandSchedule } from "./scheduleUtils";
import type { Todo } from "@/types/todo";

type CalendarEvent = {
  id: string;
  todo: Todo;
  scheduleIndex: number;
  start: Dayjs;
  end: Dayjs;
};

type DeadlineEvent = {
  id: string;
  todo: Todo;
  deadline: Dayjs;
};

export function useCalendarEvents(todos: Todo[], month: Dayjs) {
  return useMemo(() => {
    const monthStart = month.startOf("month");
    const monthEnd = month.endOf("month").add(1, "day");

    const scheduleEvents: CalendarEvent[] = [];
    const deadlineEvents: DeadlineEvent[] = [];

    for (const todo of todos) {
      // deadlines
      if (todo.deadlined_at) {
        const d = dayjs(todo.deadlined_at);
        if (d.isAfter(monthStart) && d.isBefore(monthEnd)) {
          deadlineEvents.push({ id: todo.id, todo, deadline: d });
        }
      }

      // schedules
      if (todo.schedules) {
        todo.schedules.forEach((schedule, idx) => {
          const expanded = expandSchedule(schedule, monthStart, monthEnd);
          expanded.forEach((ev) => {
            scheduleEvents.push({
              id: `${todo.id}-s${idx}-${ev.start.toISOString()}`,
              todo,
              scheduleIndex: idx,
              start: ev.start,
              end: ev.end,
            });
          });
        });
      }
    }

    return { scheduleEvents, deadlineEvents };
  }, [todos, month]);
}
