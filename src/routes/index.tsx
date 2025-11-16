import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  beforeLoad: () => {
    throw redirect({ to: "/todos" });
  },
});

function App() {
  return (
    <div className="App">
      <p>TodorokiはTodoを公開しまくって管理するTodoアプリケーションです。</p>
      <a href="/todos">Todoへ</a>
    </div>
  );
}
