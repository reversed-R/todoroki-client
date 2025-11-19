import type { ITodoCreateFormInput } from "@/types/todo";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, type UseFormReturn } from "react-hook-form";

export function MonthlyFields({
  form,
  index,
}: {
  form: UseFormReturn<ITodoCreateFormInput>;
  index: number;
}) {
  return (
    <>
      {/* Start */}
      <Controller
        control={form.control}
        name={`schedules.${index}.monthlyStart.day`}
        render={({ field }) => (
          <TextField {...field} type="number" label="Start day" />
        )}
      />

      <Controller
        control={form.control}
        name={`schedules.${index}.monthlyStart.time`}
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

      {/* End */}
      <Controller
        control={form.control}
        name={`schedules.${index}.monthlyEnd.day`}
        render={({ field }) => (
          <TextField {...field} type="number" label="End day" />
        )}
      />

      <Controller
        control={form.control}
        name={`schedules.${index}.monthlyEnd.time`}
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
