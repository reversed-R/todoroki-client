import { Dayjs } from "dayjs";
import styles from "./index.module.scss";
import {
  Box,
  Typography,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useCalendarEvents } from "../useCalendarEvents";
import type { Todo } from "@/types/todo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface Props {
  month: Dayjs;
  todos: Todo[];
  onSelectDate: (date: Dayjs) => void;
}

/** Maximum number of events to display in each cell */
const MAX_EVENTS = 3;

export function MonthlyCalendar({ month, todos, onSelectDate }: Props) {
  const { scheduleEvents, deadlineEvents } = useCalendarEvents(todos, month);

  const monthStart = month.startOf("month");
  const monthEnd = month.endOf("month");

  const days: Dayjs[] = [];

  // Fill calendar grid from Sunday start
  const start = monthStart.startOf("week");
  const end = monthEnd.endOf("week");

  let cur = start;
  while (cur.isBefore(end)) {
    days.push(cur);
    cur = cur.add(1, "day");
  }

  // Group events by day
  const eventsByDay: Record<
    string,
    { type: "schedule" | "deadline"; label: string }[]
  > = {};

  for (const d of days) {
    eventsByDay[d.format("YYYY-MM-DD")] = [];
  }

  for (const ev of scheduleEvents) {
    const key = ev.start.format("YYYY-MM-DD");
    if (eventsByDay[key]) {
      eventsByDay[key].push({
        type: "schedule",
        label: `${ev.start.format("HH:mm")} ${ev.todo.name}`,
      });
    }
  }

  for (const dl of deadlineEvents) {
    const key = dl.deadline.format("YYYY-MM-DD");
    if (eventsByDay[key]) {
      eventsByDay[key].push({
        type: "deadline",
        label: `〆 ${dl.todo.name}`,
      });
    }
  }

  return (
    <div className={styles.calendarGrid}>
      <ThemeProvider theme={darkTheme}>
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div key={w} className={styles.weekHeader}>
            {w}
          </div>
        ))}

        {/* Calendar cells */}
        {days.map((d) => {
          const key = d.format("YYYY-MM-DD");
          const items = eventsByDay[key] ?? [];
          const isCurrentMonth = d.month() === month.month();

          return (
            <Paper
              key={key}
              className={styles.dayCell}
              onClick={() => onSelectDate(d)}
              elevation={1}
            >
              <Typography
                variant="body2"
                className={
                  isCurrentMonth ? styles.dateNormal : styles.dateMuted
                }
              >
                {d.date()}
              </Typography>

              <Box className={styles.events}>
                {items.slice(0, MAX_EVENTS).map((ev, i) => (
                  <div
                    key={i}
                    className={
                      ev.type === "deadline"
                        ? styles.deadlineEvent
                        : styles.scheduleEvent
                    }
                  >
                    {ev.label}
                  </div>
                ))}

                {items.length > MAX_EVENTS && (
                  <div className={styles.moreCount}>
                    +{items.length - MAX_EVENTS} more
                  </div>
                )}
              </Box>
            </Paper>
          );
        })}
      </ThemeProvider>
    </div>
  );
}
