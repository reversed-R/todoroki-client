import React from "react";
import { Dayjs } from "dayjs";
import styles from "./index.module.scss";

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import type { Todo } from "@/types/todo";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Props
interface DailyAgendaProps {
  date: Dayjs;
  scheduleEvents: {
    id: string;
    todo: Todo;
    start: Dayjs;
    end: Dayjs;
    scheduleIndex: number;
  }[];
  deadlineEvents: {
    id: string;
    todo: Todo;
    deadline: Dayjs;
  }[];
}

// Combine schedule events + deadline events into a single timeline
export function DailyAgenda({
  date,
  scheduleEvents,
  deadlineEvents,
}: DailyAgendaProps) {
  const dayStart = date.startOf("day");
  const dayEnd = date.endOf("day");

  // Filter today's events
  const todaysSchedules = scheduleEvents.filter(
    (ev) =>
      (ev.start.isAfter(dayStart) && ev.start.isBefore(dayEnd)) ||
      (ev.end.isAfter(dayStart) && ev.end.isBefore(dayEnd)),
  );

  const todaysDeadlines = deadlineEvents.filter(
    (ev) => ev.deadline.isAfter(dayStart) && ev.deadline.isBefore(dayEnd),
  );

  // Normalize all items into a timeline sorted by time
  type TimelineItem =
    | { type: "schedule"; time: Dayjs; ev: (typeof todaysSchedules)[number] }
    | { type: "deadline"; time: Dayjs; ev: (typeof todaysDeadlines)[number] };

  const timeline: TimelineItem[] = [];

  todaysSchedules.forEach((ev) => {
    timeline.push({ type: "schedule", time: ev.start, ev });
  });

  todaysDeadlines.forEach((ev) => {
    timeline.push({ type: "deadline", time: ev.deadline, ev });
  });

  // Sort chronologically
  timeline.sort((a, b) => a.time.valueOf() - b.time.valueOf());

  return (
    <div className={styles.agendaContainer}>
      <ThemeProvider theme={darkTheme}>
        <Typography variant="h6" className={styles.dateHeader}>
          {date.format("YYYY/MM/DD (ddd)")}
        </Typography>

        <List className={styles.eventList}>
          {timeline.map((item) => {
            if (item.type === "schedule") {
              const { ev } = item;
              return (
                <React.Fragment key={ev.id}>
                  <ListItem className={styles.scheduleItem}>
                    <ListItemText
                      primary={ev.todo.name}
                      secondary={`${ev.start.format("HH:mm")} - ${ev.end.format("HH:mm")}`}
                      className={styles.listItemInner}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            }

            if (item.type === "deadline") {
              const { ev } = item;
              return (
                <React.Fragment key={ev.id}>
                  <ListItem className={styles.deadlineItem}>
                    <ListItemText
                      primary={`締切: ${ev.todo.name}`}
                      secondary={ev.deadline.format("HH:mm")}
                      className={styles.listItemInner}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            }
          })}

          {timeline.length === 0 && (
            <Typography className={styles.noEvents}>
              この日はイベントがありません
            </Typography>
          )}
        </List>
      </ThemeProvider>
    </div>
  );
}
