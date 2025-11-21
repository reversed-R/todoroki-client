import { Icon } from "@iconify/react";
import { useNavigate } from "@tanstack/react-router";
import styles from "./index.module.scss";

export function DoitDetailButton({ doitId }: { doitId: string }) {
  const navigate = useNavigate();

  return (
    <Icon
      icon="material-symbols:open-in-new-rounded"
      onClick={() => {
        navigate({
          to: "/doits/$doit_id",
          params: {
            doit_id: doitId,
          },
        });
      }}
      className={styles.button}
    />
  );
}
