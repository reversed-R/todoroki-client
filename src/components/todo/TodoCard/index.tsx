import type { Todo } from "@/types/todo";
import styles from "./index.module.scss";

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.name}>{todo.name}</h2>
      <p className={styles.description}>{todo.description}</p>
    </section>
  );
}
