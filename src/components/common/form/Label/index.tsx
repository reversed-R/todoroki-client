import styles from "./index.module.scss";
import type { LabelHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import { Error } from "@/components/common/form/Error";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  label: string;
  error?: FieldError;
}

export function Label({ children, label, error, ...props }: Props) {
  return (
    <label {...props} className={styles.label}>
      <p className={styles.labelText}>{label}</p>
      {children}
      {error && (
        <Error>
          {error.type === "required"
            ? `${label}を入力してください`
            : error.message}
        </Error>
      )}
    </label>
  );
}
