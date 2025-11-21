import type { TodoSchedule } from "@/types/todo";
import dayjs from "dayjs";

function dateToWeekday(date: number): string {
  switch (date) {
    case 5:
      return "月曜";
    case 6:
      return "火曜";
    case 7:
      return "水曜";
    case 8:
      return "木曜";
    case 9:
      return "金曜";
    case 10:
      return "土曜";
    case 11:
      return "日曜";
    default:
      return "不明";
  }
}

export function TodoScheduleDisplay({ schedule }: { schedule: TodoSchedule }) {
  const startsAt = dayjs(schedule.starts_at);
  const endsAt = dayjs(schedule.ends_at);

  return (
    <div>
      {schedule.interval === "once" && (
        <p>
          <time dateTime={startsAt.toISOString()}>
            {startsAt.format("YYYY/MM/DD hh:mm")}
          </time>
          {" ~ "}
          <time dateTime={endsAt.toISOString()}>
            {endsAt.format("YYYY/MM/DD hh:mm")}
          </time>
        </p>
      )}

      {schedule.interval === "daily" && (
        <p>
          毎日
          <time dateTime={startsAt.format("hh:mm")}>
            {startsAt.format("hh:mm")}
          </time>
          {" ~ "}
          <time dateTime={endsAt.format("hh:mm")}>
            {endsAt.format("hh:mm")}
          </time>
        </p>
      )}

      {schedule.interval === "weekly" && (
        <p>
          毎週
          {dateToWeekday(startsAt.date())}
          <time dateTime={startsAt.format("hh:mm")}>
            {startsAt.format("hh:mm")}
          </time>
          {" ~ "}
          {dateToWeekday(startsAt.date())}
          <time dateTime={endsAt.format("hh:mm")}>
            {endsAt.format("hh:mm")}
          </time>
        </p>
      )}

      {schedule.interval === "monthly" && (
        <p>
          毎月
          {startsAt.date()}日
          <time dateTime={startsAt.format("hh:mm")}>
            {startsAt.format("hh:mm")}
          </time>
          {" ~ "}
          {endsAt.date()}日
          <time dateTime={endsAt.format("hh:mm")}>
            {endsAt.format("hh:mm")}
          </time>
        </p>
      )}
    </div>
  );
}
