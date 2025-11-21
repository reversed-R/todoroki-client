import { Icon } from "@iconify/react";
import styles from "./index.module.scss";
import type { Todo } from "@/types/todo";
import { $api } from "@/lib/openapi";
import { useAuth } from "@/context/auth";
import { isStrongerThanOrEqualsTo } from "@/types/user";

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

  const { userRole } = useAuth();

  const onClickeNotYetStarted = isStrongerThanOrEqualsTo(userRole, "owner")
    ? () => {
        patchTodo.mutate({
          params: {
            path: {
              todo_id: todo.id,
            },
          },
          body: { status: "on-progress" },
        });
      }
    : () => {};

  const onClickeOnProgress = isStrongerThanOrEqualsTo(userRole, "owner")
    ? () => {
        patchTodo.mutate({
          params: {
            path: {
              todo_id: todo.id,
            },
          },
          body: { status: "completed" },
        });
      }
    : () => {};

  switch (state) {
    case "not-yet-started":
      return (
        <Icon
          icon="material-symbols:play-circle-rounded"
          className={styles.button}
          onClick={onClickeNotYetStarted}
        />
      );

    case "on-progress":
      return (
        <Icon
          icon="material-symbols:fast-forward-rounded"
          className={styles.button}
          onClick={onClickeOnProgress}
        />
      );

    case "completed":
      return (
        <Icon icon="material-symbols:done-rounded" className={styles.button} />
      );
  }
}
