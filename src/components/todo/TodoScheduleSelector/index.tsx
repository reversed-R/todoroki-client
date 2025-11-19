import { Button } from "@/components/common/Button";
import type { ITodoCreateFormInput } from "@/types/todo";
import { Controller, type UseFormReturn } from "react-hook-form";
import { OnceFields } from "./fields/OnceFields";
import { DailyFields } from "./fields/DailyFields";
import { WeeklyFields } from "./fields/WeeklyFields";
import { MonthlyFields } from "./fields/MonthlyFields";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export function TodoScheduleSelector({
  form,
  index,
  remove,
}: {
  form: UseFormReturn<ITodoCreateFormInput>;
  index: number;
  remove: (i: number) => void;
}) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const interval = form.watch(`schedules.${index}.interval`);

  return (
    <ThemeProvider theme={darkTheme}>
      <Controller
        control={form.control}
        name={`schedules.${index}.interval`}
        render={({ field }) => (
          <Select {...field} fullWidth>
            <MenuItem value="once">once</MenuItem>
            <MenuItem value="daily">daily</MenuItem>
            <MenuItem value="weekly">weekly</MenuItem>
            <MenuItem value="monthly">monthly</MenuItem>
          </Select>
        )}
      />

      {interval === "once" && <OnceFields form={form} index={index} />}
      {interval === "daily" && <DailyFields form={form} index={index} />}
      {interval === "weekly" && <WeeklyFields form={form} index={index} />}
      {interval === "monthly" && <MonthlyFields form={form} index={index} />}

      <Button onClick={() => remove(index)} color="error">
        削除
      </Button>
    </ThemeProvider>
  );
}
