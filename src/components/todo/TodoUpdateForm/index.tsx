import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import { ToggleButton } from "@/components/common/form/ToggleButton";
import { TextArea } from "@/components/common/form/TextArea";
import type { ITodoUpdateFormInput, Todo } from "@/types/todo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function TodoUpdateForm({
  todo,
  onSubmit,
  onCancel,
}: {
  todo: Todo;
  onSubmit: (data: ITodoUpdateFormInput) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ITodoUpdateFormInput>({
    defaultValues: {
      name: todo.name,
      description: todo.description,
      is_public: todo.is_public,
      alternative_name: todo.alternative_name,
      scheduled_at: todo.deadlined_at ? dayjs(todo.deadlined_at) : undefined,
    },
    mode: "onChange",
  });

  const isPublic = watch("is_public");

  return (
    <Form<ITodoUpdateFormInput>
      onSubmit={onSubmit}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      buttonText={"Todoを更新"}
    >
      <Label error={errors.name} label="名前">
        <TextBox {...register("name", {})} aria-invalid={!!errors.name} />
      </Label>

      <Label error={errors.description} label="概要">
        <TextArea
          {...register("description", {})}
          aria-invalid={!!errors.description}
          height="6em"
        />
      </Label>

      <Label error={errors.description} label="公開設定">
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

      <Label label="締め切り">
        <Controller
          control={control}
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
