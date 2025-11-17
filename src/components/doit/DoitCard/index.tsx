import styles from "./index.module.scss";
import { LabelBadge } from "@/components/label/LabelBadge";
import { Button } from "@/components/common/Button";
import { useNavigate } from "@tanstack/react-router";
import type { Doit } from "@/types/doit";

export function DoitCard({ doit }: { doit: Doit }) {
  const navigate = useNavigate();

  return (
    <section className={styles.card}>
      <h2 className={styles.name}>
        {doit.name +
          (doit.alternative_name && doit.alternative_name !== doit.name
            ? " [" + doit.alternative_name + "]"
            : "")}
      </h2>
      <p className={styles.description}>{doit.description}</p>
      <div className={styles.labelBadgesContainer}>
        {doit.labels.map((l) => (
          <LabelBadge key={l.id} label={l} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate({ to: `/doits/${doit.id}/edit` });
        }}
        variant={"secondary"}
      >
        更新
      </Button>
    </section>
  );
}
