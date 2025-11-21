import styles from "./index.module.scss";
import { LabelBadge } from "@/components/label/LabelBadge";
import type { Doit } from "@/types/doit";
import { DoitEditButton } from "../DoitEditButton";
import { DoitDetailButton } from "../DoitDetailButton";

export function DoitCard({ doit }: { doit: Doit }) {
  return (
    <section className={styles.card}>
      <div className={styles.links}>
        <DoitEditButton doitId={doit.id} />
        <DoitDetailButton doitId={doit.id} />
      </div>
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
    </section>
  );
}
