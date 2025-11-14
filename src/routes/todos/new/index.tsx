import { TodoCreateForm } from "@/components/todo/TodoCreateForm";
import { $api } from "@/lib/openapi";
import { newTodoRequest, type ITodoCreateFormInput } from "@/types/todo";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/todos/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const postUser = $api.client().useMutation("post", "/todos", {
    onSuccess: () => {
      console.log("create todo succeeded");
      navigate({ to: "/todos" });
    },
    onError: () => {
      console.log("create todo failed");
    },
  });

  const onSubmit = (data: ITodoCreateFormInput) => {
    console.log("onSubmit");
    postUser.mutate({
      body: newTodoRequest(data),
    });
  };

  return (
    <div>
      <section>
        <TodoCreateForm
          onSubmit={onSubmit}
          onCancel={() => {
            navigate({ to: "/todos" });
          }}
        />
      </section>
    </div>
  );
}
