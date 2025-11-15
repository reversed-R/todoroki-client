import styles from "./index.module.scss";
import type { Label } from "@/types/label";

export function LabelBadge({ label }: { label: Label }) {
  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: label.color
          ? hexToRgbaStr(label.color, 0.7)
          : "rgb(17, 187, 136, 0.7)",
        border: "2px solid" + (label.color ? label.color : "#1b8"),
      }}
    >
      {label.name}
    </span>
  );
}

function hexToRgbaStr(hex: string, a: number): string {
  hex = hex.replace(/^#/, ""); // 先頭の#を除去
  return (
    "rgba(" +
    parseInt(hex.substring(0, 2), 16).toString() +
    "," +
    parseInt(hex.substring(2, 4), 16).toString() +
    "," +
    parseInt(hex.substring(4, 6), 16).toString() +
    "," +
    a +
    ")"
  );
}
