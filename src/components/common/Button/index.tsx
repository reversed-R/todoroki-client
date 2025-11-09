import styles from "./index.module.scss";
import type { ButtonHTMLAttributes } from "react";
// import PlusIcon from "@/assets/icons/plus.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "add";
}

export function Button({ variant = "primary", ...props }: Props) {
  return (
    <button
      {...props}
      className={[styles.button, styles[variant], props.className].join(" ")}
    >
      {/*variant === "add" && (
        <img src={PlusIcon} alt="" className={styles.icon} />
      )*/}
      {props.children}
    </button>
  );
}
