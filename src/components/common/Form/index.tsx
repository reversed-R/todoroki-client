import { Button } from "../Button";
import styles from "./index.module.scss";
import type { IFormInput } from "@/types/form";
import type { UseFormHandleSubmit } from "react-hook-form";

interface Props<T extends IFormInput> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  handleSubmit: UseFormHandleSubmit<T, T>;
  buttonText: string;
}

export function Form<T extends IFormInput>({
  children,
  onSubmit,
  onCancel,
  handleSubmit,
  buttonText,
}: Props<T>) {
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {children}
      <div className={styles.button_container}>
        <Button onClick={onCancel} variant="secondary">
          キャンセル
        </Button>
        <Button type="submit">{buttonText}</Button>
      </div>
    </form>
  );
}
