import type { Todo } from "@/types/todo";
import styles from "./index.module.scss";
import { LabelBadge } from "@/components/label/LabelBadge";
import { TodoProgressButton } from "../TodoProgressButton";
import { TodoEditButton } from "../TodoEditButton";
import { TodoDetailButton } from "../TodoDetailButton";
import { UserRoleGuard } from "@/components/user/UserRoleGuard";
import dayjs from "dayjs";

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <section className={styles.card}>
      <div className={styles.links}>
        <TodoProgressButton todo={todo} />
        <UserRoleGuard>
          <TodoEditButton todoId={todo.id} />
        </UserRoleGuard>
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
      {todo.deadlined_at && (
        <p className={styles.deadlinedAt}>
          ~ {dayjs(todo.deadlined_at).locale("jp").format("YYYY/MM/DD hh:mm")}
        </p>
      )}
    </section>
  );
}
