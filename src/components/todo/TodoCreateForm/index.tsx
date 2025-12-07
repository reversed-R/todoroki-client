import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import type { ITodoCreateFormInput } from "@/types/todo";
import { ToggleButton } from "@/components/common/form/ToggleButton";
import { TextArea } from "@/components/common/form/TextArea";
import { CheckboxGroup } from "@/components/common/form/CheckBoxGroup";
import { $api } from "@/lib/openapi";
import { Checkbox } from "@/components/common/form/CheckBox";
import { LabelBadge } from "@/components/label/LabelBadge";
import { Button } from "@/components/common/Button";
import { TodoScheduleSelector } from "../TodoScheduleSelector";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function TodoCreateForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: ITodoCreateFormInput) => void;
  onCancel: () => void;
}) {
  const form = useForm<ITodoCreateFormInput>({
    defaultValues: {
      is_public: false,
      labels: [],
      schedules: [],
      scheduled_at: null,
      description: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = form;

  const { data: labels } = $api.client().useSuspenseQuery("get", "/labels");

  const isPublic = watch("is_public");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules" as never,
  });

  return (
    <Form<ITodoCreateFormInput>
      onSubmit={onSubmit}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      buttonText={"Todoを作成"}
    >
      <Label error={errors.name} label="名前">
        <TextBox
          {...register("name", {
            required: true,
          })}
          aria-invalid={!!errors.name}
        />
      </Label>

      <Label error={errors.description} label="概要">
        <TextArea
          {...register("description", {
            required: true,
          })}
          aria-invalid={!!errors.description}
          height="6em"
        />
      </Label>

      <Label error={errors.is_public} label="公開設定">
        <div>
          <ToggleButton {...register("is_public")} />
        </div>
      </Label>

      {!isPublic && (
        <Label error={errors.alternative_name} label="代わりの名前">
          <TextBox
            {...register("alternative_name", {
              required: false,
            })}
            aria-invalid={!!errors.alternative_name}
          />
        </Label>
      )}

      <CheckboxGroup label="ラベル">
        {labels.map((l) => (
          <Checkbox key={l.id} value={String(l.id)} {...register("labels")}>
            <LabelBadge label={l} />
          </Checkbox>
        ))}
      </CheckboxGroup>

      <Label label="スケジュール">
        <Button
          variant="add"
          onClick={() =>
            append({
              interval: "once",
            })
          }
        >
          追加
        </Button>

        {fields.map((_, index) => (
          <TodoScheduleSelector
            key={index}
            form={form}
            index={index}
            remove={remove}
          />
        ))}
      </Label>

      <Label label="締め切り">
        <Controller
          control={form.control}
          name={"scheduled_at"}
          render={({ field }) => (
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Deadline"
                  value={field.value || null}
                  onChange={(v) => field.onChange(v)}
                />
              </LocalizationProvider>
            </ThemeProvider>
          )}
        />
      </Label>
    </Form>
  );
}
