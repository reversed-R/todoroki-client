import type { ITodoCreateFormInput } from "@/types/todo";
import { Controller, type UseFormReturn } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export function DailyFields({
  form,
  index,
}: {
  form: UseFormReturn<ITodoCreateFormInput>;
  index: number;
}) {
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name={`schedules.${index}.dailyStart`}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start time"
              value={field.value || null}
              onChange={(v) => field.onChange(v)}
            />
          </LocalizationProvider>
        )}
      />

      <Controller
        control={control}
        name={`schedules.${index}.dailyEnd`}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End time"
              value={field.value || null}
              onChange={(v) => field.onChange(v)}
            />
          </LocalizationProvider>
        )}
      />
    </>
  );
}
