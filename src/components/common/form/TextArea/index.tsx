import styles from "./index.module.scss";
import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: number | string;
}

export function TextArea({ height, style, ...props }: Props) {
  return (
    <textarea
      className={styles.textarea}
      style={{ height, ...style }}
      {...props}
    />
  );
}
