import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import type { components } from "@/schema";
import type { IUserFormInput } from "@/types/user";
import { Label } from "@/components/common/form/Label";
import { TextBox } from "@/components/common/form/TextBox";
import { Form } from "@/components/common/Form";

export function SignupForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: IUserFormInput) => void;
  onCancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormInput>({
    defaultValues: {},
    mode: "onChange",
  });

  return (
    <Form<IUserFormInput>
      onSubmit={onSubmit}
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      buttonText={"ユーザー登録"}
    >
      <Label error={errors.name} label="おなまえ">
        <TextBox
          {...register("name", {
            required: true,
          })}
          aria-invalid={!!errors.name}
        />
      </Label>
    </Form>
  );
}
