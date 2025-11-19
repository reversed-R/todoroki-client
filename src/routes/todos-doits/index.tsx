import { TodoCard } from "@/components/todo/TodoCard";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute } from "@tanstack/react-router";
import styles from "@/styles/routes/todos-doits/index.module.scss";
import { TodoMenuBar } from "@/components/todo/TodoMenuBar";
import { CommonNavigationBar } from "@/components/common/CommonNavigationBar";
import { DoitCard } from "@/components/doit/DoitCard";

export const Route = createFileRoute("/todos-doits/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const { data: todos, isError } = $api
    .client()
    .useSuspenseQuery("get", "/todos");

  const { data: doits, isError: isDoitError } = $api
    .client()
    .useSuspenseQuery("get", "/doits");

  const { data: labels, isError: isLabelError } = $api
    .client()
    .useSuspenseQuery("get", "/labels");

  if (isError && isLabelError && isDoitError) {
    return (
      <section>
        <p>データの取得に失敗しました</p>
      </section>
    );
  }

  return (
    <>
      <CommonNavigationBar />
      <div className={styles.container}>
        <TodoMenuBar labels={labels} />
        <div>
          <h2 className={styles.heading}>Todo</h2>
          <div className={styles.gridContainer}>
            {todos.map((t) => (
              <TodoCard key={t.id} todo={t} />
            ))}
          </div>
        </div>
        <div>
          <h2 className={styles.heading}>Do it!</h2>
          <div className={styles.doitGridContainer}>
            {doits.map((d) => (
              <DoitCard key={d.id} doit={d} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
