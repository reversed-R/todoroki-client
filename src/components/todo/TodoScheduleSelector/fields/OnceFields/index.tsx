import type { ITodoCreateFormInput } from "@/types/todo";
import { Controller, type UseFormReturn } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export function OnceFields({
  form,
  index,
}: {
  form: UseFormReturn<ITodoCreateFormInput>;
  index: number;
}) {
  return (
    <>
      <Controller
        control={form.control}
        name={`schedules.${index}.onceStart`}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start"
              value={field.value || null}
              onChange={(v) => field.onChange(v)}
            />
          </LocalizationProvider>
        )}
      />

      <Controller
        control={form.control}
        name={`schedules.${index}.onceEnd`}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End"
              value={field.value || null}
              onChange={(v) => field.onChange(v)}
            />
          </LocalizationProvider>
        )}
      />
    </>
  );
}
