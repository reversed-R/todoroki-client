import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import styles from "./index.module.scss";

export function TodoDetailButton({ todoId }: { todoId: string }) {
  const navigate = useNavigate();

  return (
    <Icon
      icon="material-symbols:open-in-new-rounded"
      onClick={() => {
        navigate({
          to: "/todos/$todo_id",
          params: {
            todo_id: todoId,
          },
        });
      }}
      className={styles.button}
    />
  );
}
