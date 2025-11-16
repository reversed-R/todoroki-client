import { TodoCard } from "@/components/todo/TodoCard";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute } from "@tanstack/react-router";
import styles from "@/styles/routes/todos/index.module.scss";
import { TodoMenuBar } from "@/components/todo/TodoMenuBar";
import { NavigationBar } from "@/components/common/NavigationBar";

export const Route = createFileRoute("/todos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const { data: todos, isError } = $api
    .client()
    .useSuspenseQuery("get", "/todos");

  const { data: labels, isError: isLabelError } = $api
    .client()
    .useSuspenseQuery("get", "/labels");

  if (isError && isLabelError) {
    return (
      <section>
        <p>データの取得に失敗しました</p>
      </section>
    );
  }

  return (
    <>
      <NavigationBar
        links={[
          { label: "Todos", link: "/todos" },
          { label: "Top", link: "/" },
        ]}
      />
      <div className={styles.container}>
        <TodoMenuBar labels={labels} />
        <div className={styles.gridContainer}>
          {todos.map((t) => (
            <TodoCard todo={t} />
          ))}
        </div>
      </div>
    </>
  );
}
