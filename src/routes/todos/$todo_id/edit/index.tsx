import { TodoUpdateForm } from "@/components/todo/TodoUpdateForm";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import {
  newTodoUpdateRequest,
  type ITodoUpdateFormInput,
  type Todo,
} from "@/types/todo";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/todos/$todo_id/edit/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const { todo_id } = useParams({ from: "/todos/$todo_id/edit/" });
  const navigate = useNavigate();

  const { data: todos } = $api.client().useSuspenseQuery("get", "/todos");
  const todo = todos.find((t) => t.id === todo_id) as Todo;

  const patchTodo = $api.client().useMutation("patch", "/todos/{todo_id}", {
    onSuccess: () => {
      console.log("update todo succeeded");
      navigate({ to: "/todos" });
    },
    onError: () => {
      console.log("update todo failed");
    },
  });

  const onSubmit = (data: ITodoUpdateFormInput) => {
    patchTodo.mutate({
      params: {
        path: {
          todo_id: todo_id,
        },
      },
      body: newTodoUpdateRequest(data),
    });
  };

  return (
    <div>
      <section>
        <TodoUpdateForm
          todo={todo}
          onSubmit={onSubmit}
          onCancel={() => {
            navigate({ to: "/todos" });
          }}
        />
      </section>
    </div>
  );
}
