import type { ITodoCreateFormInput } from "@/types/todo";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Controller, type UseFormReturn } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const weekdayOptions = [
  { label: "Mon", value: 1 },
  { label: "Tue", value: 2 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 4 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 6 },
  { label: "Sun", value: 7 },
];

export function WeeklyFields({
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
        name={`schedules.${index}.weeklyStart.weekday`}
        render={({ field }) => (
          <Select {...field} label="Start weekday">
            {weekdayOptions.map((w) => (
              <MenuItem key={w.value} value={w.value}>
                {w.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name={`schedules.${index}.weeklyStart.time`}
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
        name={`schedules.${index}.weeklyEnd.weekday`}
        render={({ field }) => (
          <Select {...field} label="End weekday">
            {weekdayOptions.map((w) => (
              <MenuItem key={w.value} value={w.value}>
                {w.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        control={form.control}
        name={`schedules.${index}.weeklyEnd.time`}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End time"
              value={field.value || null}
              onChange={(v) => field.onChange(v)}
            />
          </LocalizationProvider>
        )}
      />{" "}
    </>
  );
}
