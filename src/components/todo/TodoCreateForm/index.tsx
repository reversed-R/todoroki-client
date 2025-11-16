import { useForm } from "react-hook-form";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import type { ITodoCreateFormInput } from "@/types/todo";
import { ToggleButton } from "@/components/common/form/ToggleButton";
import { TextArea } from "@/components/common/form/TextArea";
import { CheckboxGroup } from "@/components/common/form/CheckBoxGroup";
import { $api } from "@/lib/openapi";
import { Checkbox } from "@/components/common/form/CheckBox";

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

  const { data: labels } = $api.client().useSuspenseQuery("get", "/labels");

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

      <CheckboxGroup label="ラベル" error={errors.labels}>
        {labels.map((l) => (
          <Checkbox key={l.id} value={l.id} {...register("labels", {})}>
            {l.name}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Form>
  );
}
