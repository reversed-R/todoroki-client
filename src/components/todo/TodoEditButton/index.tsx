import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import styles from "./index.module.scss";

export function TodoEditButton({ todoId }: { todoId: string }) {
  const navigate = useNavigate();

  return (
    <Icon
      icon="material-symbols:edit-rounded"
      onClick={() => {
        navigate({
          to: "/todos/$todo_id/edit",
          params: {
            todo_id: todoId,
          },
        });
      }}
      className={styles.button}
    />
  );
}
