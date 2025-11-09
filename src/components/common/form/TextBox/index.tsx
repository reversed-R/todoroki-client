import styles from "./index.module.scss";
import type { InputHTMLAttributes } from "react";

export function TextBox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="text" className={styles.textbox} {...props} />;
}
