import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import styles from "./index.module.scss";

export function DoitEditButton({ doitId }: { doitId: string }) {
  const navigate = useNavigate();

  return (
    <Icon
      icon="material-symbols:edit-rounded"
      onClick={() => {
        navigate({
          to: "/doits/$doit_id/edit",
          params: {
            doit_id: doitId,
          },
        });
      }}
      className={styles.button}
    />
  );
}
