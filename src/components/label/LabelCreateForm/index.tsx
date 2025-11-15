import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";
import { TextArea } from "@/components/common/form/TextArea";
import type { ILabelCreateFormInput } from "@/types/label";
import { HexColorPicker } from "react-colorful";
import { LabelBadge } from "../LabelBadge";

export function LabelCreateForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: ILabelCreateFormInput) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ILabelCreateFormInput>({
    defaultValues: {},
    mode: "onChange",
  });

  const inputtedName = watch("name");

  return (
    <Form<ILabelCreateFormInput>
      onSubmit={onSubmit}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      buttonText={"ラベルを作成"}
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

      <Label error={errors.color} label="色">
        <Controller
          name="color"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <HexColorPicker
                color={field.value || undefined}
                onChange={field.onChange}
              />

              <LabelBadge
                label={{
                  name: inputtedName,
                  color: field.value,
                  description: "",
                  id: "",
                  created_at: "",
                  updated_at: "",
                }}
              />

              {/* hidden input を置くと form の submit 時に自動で color が含まれる */}
              <input type="hidden" {...field} />
            </div>
          )}
        />
      </Label>
    </Form>
  );
}
