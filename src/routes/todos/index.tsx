import { TodoCard } from "@/components/todo/TodoCard";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import styles from "@/styles/routes/todos/index.module.scss";
import { Button } from "@/components/common/Button";

export const Route = createFileRoute("/todos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();
  const navigate = useNavigate();

  const { data: todos, isError } = $api
    .client()
    .useSuspenseQuery("get", "/todos");

  if (isError) {
    return (
      <section>
        <p>データを取得中...</p>
      </section>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <Button
          onClick={() => {
            navigate({ to: "/todos/new" });
          }}
        >
          New Todo
        </Button>
      </div>
      <div className={styles.gridContainer}>
        {todos.map((t) => (
          <TodoCard todo={t} />
        ))}
      </div>
    </div>
  );
}
