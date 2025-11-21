import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute, useParams } from "@tanstack/react-router";
import styles from "@/styles/routes/doits/$doit_id/index.module.scss";
import { LabelBadge } from "@/components/label/LabelBadge";
import { DoitEditButton } from "@/components/doit/DoitEditButton";

export const Route = createFileRoute("/doits/$doit_id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();
  const { doit_id } = useParams({ from: "/doits/$doit_id/" });

  // TODO: get /doits/:id or use cached value
  const { data: doits, isError } = $api
    .client()
    .useSuspenseQuery("get", "/doits");

  const doit = doits.find((d) => d.id === doit_id);

  if (isError) {
    return (
      <section>
        <p>データの取得に失敗しました</p>
      </section>
    );
  }

  if (!doit) {
    return <div>Do it! Not Found</div>;
  }

  return (
    <div>
      <div className={styles.links}>
        <DoitEditButton doitId={doit.id} />
      </div>

      <h2 className={styles.name}>
        {doit.name +
          (doit.alternative_name && doit.alternative_name !== doit.name
            ? " [" + doit.alternative_name + "]"
            : "")}
      </h2>

      <p className={styles.description}>{doit.description}</p>

      <section className={styles.labelBadgesContainer}>
        {doit.labels.map((l) => (
          <LabelBadge key={l.id} label={l} />
        ))}
      </section>

      <section>
        <h3>公開状態</h3>
        <p>{doit.is_public ? "完全公開" : "部分公開"}</p>
      </section>

      <section>
        <h3>締め切り</h3>
        <p>{doit.deadlined_at ? doit.deadlined_at : "なし"}</p>
      </section>

      <section>
        <h3>作成/更新日時</h3>
        <p>作成: {doit.created_at}</p>
        <p>最終更新: {doit.updated_at}</p>
      </section>
    </div>
  );
}
