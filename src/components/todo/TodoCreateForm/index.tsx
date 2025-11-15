import { useForm } from "react-hook-form";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import type { ITodoCreateFormInput } from "@/types/todo";
import { ToggleButton } from "@/components/common/form/ToggleButton";
import { TextArea } from "@/components/common/form/TextArea";

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

      {/*
      <Label error={errors.description} label="概要">
        <TextBox
          {...register("description", {
            required: true,
          })}
          aria-invalid={!!errors.description}
          height="6em"
        />
      </Label> */}

      <Label error={errors.description} label="概要">
        <TextArea
          {...register("description", {
            required: true,
          })}
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
    </Form>
  );
}
