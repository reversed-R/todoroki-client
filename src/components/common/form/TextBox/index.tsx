import styles from "./index.module.scss";
import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export function TextBox({ ...props }: Props) {
  return <input type="text" className={styles.textbox} {...props} />;
}
