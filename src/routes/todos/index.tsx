import { TodoCard } from "@/components/todo/TodoCard";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import {
  createFileRoute,
  stripSearchParams,
  useSearch,
} from "@tanstack/react-router";
import styles from "@/styles/routes/todos/index.module.scss";
import { TodoMenuBar } from "@/components/todo/TodoMenuBar";
import { CommonNavigationBar } from "@/components/common/CommonNavigationBar";
import { todoSearchSchema } from "@/types/todo";

export const Route = createFileRoute("/todos/")({
  validateSearch: todoSearchSchema,
  search: {
    middlewares: [
      stripSearchParams({
        includes_completed: false,
        includes_scheduled: false,
      }),
    ],
  },
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

  const search = useSearch({ from: "/todos/" });

  return (
    <>
      <CommonNavigationBar />
      <div className={styles.container}>
        <TodoMenuBar labels={labels} />
        <div className={styles.gridContainer}>
          {todos
            .filter((t) => (t.ended_at ? search.includes_completed : true))
            .filter((t) =>
              search.includes_scheduled ? true : t.schedules.length === 0,
            )
            .map((t) => (
              <TodoCard key={t.id} todo={t} />
            ))}
        </div>
      </div>
    </>
  );
}
