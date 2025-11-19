import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute } from "@tanstack/react-router";
import styles from "@/styles/routes/todos/index.module.scss";
import { DoitCard } from "@/components/doit/DoitCard";
import { DoitMenuBar } from "@/components/doit/DoitMenuBar";
import { CommonNavigationBar } from "@/components/common/CommonNavigationBar";

export const Route = createFileRoute("/doits/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const { data: doits, isError } = $api
    .client()
    .useSuspenseQuery("get", "/doits");

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
      <CommonNavigationBar />
      <div className={styles.container}>
        <DoitMenuBar labels={labels} />
        <div className={styles.gridContainer}>
          {doits.map((d) => (
            <DoitCard key={d.id} doit={d} />
          ))}
        </div>
      </div>
    </>
  );
}
