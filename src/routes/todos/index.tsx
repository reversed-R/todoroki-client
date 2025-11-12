import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const { data: todos, isError } = $api
    .client()
    .useSuspenseQuery("get", "/todos");

  if (isError) {
    return (
      <main>
        <section>
          <p>データを取得中...</p>
        </section>
      </main>
    );
  }

  return (
    <main>
      {todos.map((t) => (
        <section>
          <h2>{t.name}</h2>
          <p>{t.description}</p>
        </section>
      ))}
    </main>
  );
}
