import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import type { ITodoCreateFormInput } from "@/types/todo";
import { ToggleButton } from "@/components/common/form/ToggleButton";

export function TodoCreateForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: ITodoCreateFormInput) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ITodoCreateFormInput>({
    defaultValues: {},
    mode: "onChange",
  });

  const isPublic = watch("is_public");

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
        <TextBox
          {...register("description", {
            required: true,
          })}
          aria-invalid={!!errors.description}
        />
      </Label>

      <Label error={errors.description} label="公開設定">
        <ToggleButton {...register("is_public")} />
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
    </Form>
  );
}
