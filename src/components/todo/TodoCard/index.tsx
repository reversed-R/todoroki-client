import type { Todo } from "@/types/todo";
import styles from "./index.module.scss";
import { LabelBadge } from "@/components/label/LabelBadge";
import { Button } from "@/components/common/Button";
import { useNavigate } from "@tanstack/react-router";

export function TodoCard({ todo }: { todo: Todo }) {
  const navigate = useNavigate();

  return (
    <section className={styles.card}>
      <h2 className={styles.name}>
        {todo.name +
          (todo.alternative_name && todo.alternative_name !== todo.name
            ? " [" + todo.alternative_name + "]"
            : "")}
      </h2>
      <p className={styles.description}>{todo.description}</p>
      <div className={styles.labelBadgesContainer}>
        {todo.labels.map((l) => (
          <LabelBadge key={l.id} label={l} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate({ to: `/todos/${todo.id}/edit` });
        }}
        variant={"secondary"}
      >
        更新
      </Button>
    </section>
  );
}
