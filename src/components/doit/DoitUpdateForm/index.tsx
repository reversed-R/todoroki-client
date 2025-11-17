import { useForm } from "react-hook-form";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import { ToggleButton } from "@/components/common/form/ToggleButton";
import { TextArea } from "@/components/common/form/TextArea";
import type { Doit, IDoitUpdateFormInput } from "@/types/doit";

export function DoitUpdateForm({
  doit,
  onSubmit,
  onCancel,
}: {
  doit: Doit;
  onSubmit: (data: IDoitUpdateFormInput) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IDoitUpdateFormInput>({
    defaultValues: {
      name: doit.name,
      description: doit.description,
      is_public: doit.is_public,
      alternative_name: doit.alternative_name,
    },
    mode: "onChange",
  });

  const isPublic = watch("is_public");

  return (
    <Form<IDoitUpdateFormInput>
      onSubmit={onSubmit}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      buttonText={"Do it! を更新"}
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
    </Form>
  );
}
