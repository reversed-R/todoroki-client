import { Icon } from "@iconify/react";
import styles from "./index.module.scss";
import type { Todo } from "@/types/todo";
import { $api } from "@/lib/openapi";

export function TodoProgressButton({ todo }: { todo: Todo }) {
  const state = todo.ended_at
    ? "completed"
    : todo.started_at
      ? "on-progress"
      : "not-yet-started";

  const patchTodo = $api.client().useMutation("patch", "/todos/{todo_id}", {
    onSuccess: () => {
      console.log("update todo succeeded");
    },
    onError: () => {
      console.log("update todo failed");
    },
  });

  switch (state) {
    case "not-yet-started":
      return (
        <Icon
          icon="material-symbols:play-circle-rounded"
          className={styles.button}
          onClick={() => {
            patchTodo.mutate({
              params: {
                path: {
                  todo_id: todo.id,
                },
              },
              body: { status: "on-progress" },
            });
          }}
        />
      );

    case "on-progress":
      return (
        <Icon
          icon="material-symbols:fast-forward-rounded"
          className={styles.button}
          onClick={() => {
            patchTodo.mutate({
              params: {
                path: {
                  todo_id: todo.id,
                },
              },
              body: { status: "completed" },
            });
          }}
        />
      );

    case "completed":
      return (
        <Icon icon="material-symbols:done-rounded" className={styles.button} />
      );
  }
}
