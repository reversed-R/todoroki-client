import { type ReactNode, useState } from "react";
import styles from "./index.module.scss";

type Props = {
  children: ReactNode;
  defaultOpen?: boolean;
  width?: number; // MenuBarの本来の幅
  buttonWidth?: number; // 閉じた時に残す幅
};

export const MenuBar = ({
  children,
  defaultOpen = true,
  width = 250,
  buttonWidth = 32,
}: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={styles.menuBar}
      style={{
        width: open ? width : buttonWidth,
      }}
    >
      <div
        className={styles.content}
        style={{
          transform: open ? "translateX(0)" : `translateX(-${width}px)`,
        }}
      >
        {children}
      </div>

      <button
        className={styles.toggleBtn}
        onClick={() => setOpen(!open)}
        style={{
          right: 0,
          width: buttonWidth,
        }}
      >
        {open ? "<<" : ">>"}
      </button>
    </div>
  );
};
