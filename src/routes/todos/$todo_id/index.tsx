import { LabelBadge } from "@/components/label/LabelBadge";
import { TodoProgressButton } from "@/components/todo/TodoProgressButton";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute, useParams } from "@tanstack/react-router";
import styles from "@/styles/routes/todos/$todo_id/index.module.scss";
import { TodoEditButton } from "@/components/todo/TodoEditButton";
import { TodoScheduleDisplay } from "@/components/todo/TodoScheduleDisplay";

export const Route = createFileRoute("/todos/$todo_id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();
  const { todo_id } = useParams({ from: "/todos/$todo_id/" });

  // TODO: get /todos/:id or use cached value
  const { data: todos, isError } = $api
    .client()
    .useSuspenseQuery("get", "/todos");

  const todo = todos.find((t) => t.id === todo_id);

  if (isError) {
    return (
      <section>
        <p>データの取得に失敗しました</p>
      </section>
    );
  }

  if (!todo) {
    return <div>Todo Not Found</div>;
  }

  return (
    <div>
      <div className={styles.links}>
        <TodoProgressButton todo={todo} />
        <TodoEditButton todoId={todo.id} />
      </div>

      <h2 className={styles.name}>
        {todo.name +
          (todo.alternative_name && todo.alternative_name !== todo.name
            ? " [" + todo.alternative_name + "]"
            : "")}
      </h2>

      <p className={styles.description}>{todo.description}</p>

      <section className={styles.labelBadgesContainer}>
        {todo.labels.map((l) => (
          <LabelBadge key={l.id} label={l} />
        ))}
      </section>

      <section>
        <h3>スケジュール</h3>
        {todo.schedules.length === 0
          ? "なし"
          : todo.schedules.map((s) => <TodoScheduleDisplay schedule={s} />)}
      </section>

      <section>
        <h3>公開状態</h3>
        <p>{todo.is_public ? "完全公開" : "部分公開"}</p>
      </section>

      <section>
        <h3>締め切り</h3>
        <p>{todo.deadlined_at ? todo.deadlined_at : "なし"}</p>
      </section>

      <section>
        <h3>作成/更新日時</h3>
        <p>作成: {todo.created_at}</p>
        <p>最終更新: {todo.updated_at}</p>
      </section>
    </div>
  );
}
