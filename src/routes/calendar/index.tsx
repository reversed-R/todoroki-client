import { useState } from "react";
import dayjs from "dayjs";
import { MonthlyCalendar } from "@/features/calendar/MonthlyCalendar";
import { DailyAgenda } from "@/features/calendar/DailyAgenda";
import { useCalendarEvents } from "@/features/calendar/useCalendarEvents";
import styles from "@/styles/routes/calendar/index.module.scss";
import { IconButton, Typography } from "@mui/material";

import { createFileRoute } from "@tanstack/react-router";
import { $api } from "@/lib/openapi";
import { CommonNavigationBar } from "@/components/common/CommonNavigationBar";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/auth";

export const Route = createFileRoute("/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const { data: todos = [] } = $api.client().useSuspenseQuery("get", "/todos");
  const { scheduleEvents, deadlineEvents } = useCalendarEvents(
    todos,
    currentMonth,
  );

  const goPrevMonth = () => setCurrentMonth((m) => m.subtract(1, "month"));
  const goNextMonth = () => setCurrentMonth((m) => m.add(1, "month"));

  return (
    <>
      <CommonNavigationBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <IconButton onClick={goPrevMonth}>
            <Icon
              icon="material-symbols:arrow-left-alt-rounded"
              className={styles.button}
            />
          </IconButton>

          <Typography variant="h5" className={styles.monthLabel}>
            {currentMonth.format("YYYY年 M月")}
          </Typography>

          <IconButton onClick={goNextMonth}>
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              className={styles.button}
            />
          </IconButton>
        </div>

        {/* Monthly View */}
        {selectedDate === null && (
          <MonthlyCalendar
            todos={todos}
            month={currentMonth}
            onSelectDate={(date) => setSelectedDate(date)}
          />
        )}

        {/* Daily View */}
        {selectedDate !== null && (
          <div className={styles.dailyWrapper}>
            <button
              className={styles.backToMonth}
              onClick={() => setSelectedDate(null)}
            >
              ← カレンダーに戻る
            </button>

            <DailyAgenda
              date={selectedDate}
              scheduleEvents={scheduleEvents}
              deadlineEvents={deadlineEvents}
            />
          </div>
        )}
      </div>
    </>
  );
}
