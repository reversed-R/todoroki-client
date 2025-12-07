import type { components } from "@/schema";
import type { IFormInput } from "./form";
import type { Dayjs } from "dayjs";
import { z } from "zod";

export const todoSearchSchema = z.object({
  includes_completed: z.boolean().optional().default(false),
  includes_scheduled: z.boolean().optional().default(false),
});

export type Todo = components["schemas"]["TodoResponse"];

export type TodoSchedule = components["schemas"]["TodoScheduleResponse"];

export type TodoRequest = components["schemas"]["TodoRequest"];

export type TodoUpdateRequest = components["schemas"]["TodoUpdateCommand"];

export interface ITodoCreateFormInput extends IFormInput {
  name: string;
  alternative_name: string | null;
  description: string;
  is_public: boolean;
  scheduled_at: Dayjs | null;
  labels: string[];
  schedules: TodoScheduleFormInput[];
}

export function newTodoRequest({
  name,
  alternative_name,
  description,
  is_public,
  scheduled_at,
  labels,
  schedules,
}: ITodoCreateFormInput): TodoRequest {
  return {
    name,
    alternative_name,
    description,
    is_public,
    scheduled_at: scheduled_at?.toISOString(),
    labels: labels.map((id) => ({ id })),
    schedules: schedules.map(todoScheduleFormInputToRequest),
  };
}

export interface ITodoUpdateFormInput extends IFormInput {
  name?: string;
  alternative_name?: string | null;
  description?: string;
  is_public?: boolean;
  scheduled_at?: Dayjs | null;
}

export function newTodoUpdateRequest({
  name,
  alternative_name,
  description,
  is_public,
  scheduled_at,
}: ITodoUpdateFormInput): TodoUpdateRequest {
  return {
    name: name ? (name !== "" ? name : undefined) : undefined,
    alternative_name:
      alternative_name !== undefined
        ? alternative_name !== ""
          ? alternative_name
          : undefined
        : undefined,
    description: description
      ? description !== ""
        ? description
        : undefined
      : undefined,
    is_public,
    scheduled_at: scheduled_at?.toISOString(),
  };
}

export type TodoScheduleInterval = "once" | "daily" | "weekly" | "monthly";

export type TodoScheduleFormInput = {
  interval: TodoScheduleInterval;
  onceStart?: Dayjs;
  onceEnd?: Dayjs;
  dailyStart?: Dayjs;
  dailyEnd?: Dayjs;
  weeklyStart?: { weekday: number; time: Dayjs };
  weeklyEnd?: { weekday: number; time: Dayjs };
  monthlyStart?: { day: number; time: Dayjs };
  monthlyEnd?: { day: number; time: Dayjs };
};

function toRFC3339(datePart: string, time: Dayjs) {
  const hh = time.hour().toString().padStart(2, "0");
  const mm = time.minute().toString().padStart(2, "0");
  return new Date(`${datePart}T${hh}:${mm}:00Z`).toISOString();
}

type TodoScheduleRequest = components["schemas"]["TodoScheduleRequest"];

export function todoScheduleFormInputToRequest(
  data: TodoScheduleFormInput,
): TodoScheduleRequest {
  switch (data.interval) {
    case "once":
      return {
        interval: data.interval,
        starts_at: data.onceStart!.toISOString(),
        ends_at: data.onceEnd!.toISOString(),
      };

    case "daily":
      return {
        interval: data.interval,
        starts_at: toRFC3339("1970-01-01", data.dailyStart!),
        ends_at: toRFC3339("1970-01-01", data.dailyEnd!),
      };

    case "weekly":
      return {
        interval: data.interval,
        starts_at: toRFC3339(
          `1970-01-${(4 + Number(data.weeklyStart!.weekday)).toString().padStart(2, "0")}`,
          data.weeklyStart!.time,
        ),
        ends_at: toRFC3339(
          `1970-01-${(4 + Number(data.weeklyEnd!.weekday)).toString().padStart(2, "0")}`,
          data.weeklyEnd!.time,
        ),
      };

    case "monthly":
      return {
        interval: data.interval,
        starts_at: toRFC3339(
          `1970-01-${data.monthlyStart!.day.toString().padStart(2, "0")}`,
          data.monthlyStart!.time,
        ),
        ends_at: toRFC3339(
          `1970-01-${data.monthlyEnd!.day.toString().padStart(2, "0")}`,
          data.monthlyEnd!.time,
        ),
      };
  }
}
