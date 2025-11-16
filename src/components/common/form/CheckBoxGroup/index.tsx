import styles from "./index.module.scss";
import type { FieldError } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { Error } from "@/components/common/form/Error";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  label: string;
  error?: FieldError;
}

export function CheckboxGroup({ children, label, error }: Props) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>{label}</legend>
      <div className={styles.checkbox_group}>{children}</div>

      {error && <Error>{error.message}</Error>}
    </fieldset>
  );
}
