import { Button } from "@/components/common/Button";
import { LabelBadge } from "@/components/label/LabelBadge";
import type { Label } from "@/types/label";
import { useNavigate } from "@tanstack/react-router";
import styles from "./index.module.scss";
import { MenuBar } from "@/components/common/MenuBar";

type Props = {
  labels: Label[];
};

export function TodoMenuBar({ labels }: Props) {
  const navigate = useNavigate();

  return (
    <MenuBar width={200}>
      <div>
        <Button
          onClick={() => {
            navigate({ to: "/todos/new" });
          }}
        >
          New Todo
        </Button>
        <section className={styles.labelsContainer}>
          <h2 className={styles.labelsHeading}>ラベル一覧</h2>
          <div className={styles.labelBadgesContainer}>
            {labels.map((l) => (
              <LabelBadge key={l.id} label={l} />
            ))}
          </div>
        </section>
        <Button
          onClick={() => {
            navigate({ to: "/labels/new" });
          }}
        >
          New Label
        </Button>
      </div>
    </MenuBar>
  );
}
