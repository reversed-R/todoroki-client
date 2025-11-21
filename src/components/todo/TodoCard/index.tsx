import type { Todo } from "@/types/todo";
import styles from "./index.module.scss";
import { LabelBadge } from "@/components/label/LabelBadge";
import { TodoProgressButton } from "../TodoProgressButton";
import { TodoEditButton } from "../TodoEditButton";
import { TodoDetailButton } from "../TodoDetailButton";

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <section className={styles.card}>
      <div className={styles.links}>
        <TodoProgressButton todo={todo} />
        <TodoEditButton todoId={todo.id} />
        <TodoDetailButton todoId={todo.id} />
      </div>
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
    </section>
  );
}
