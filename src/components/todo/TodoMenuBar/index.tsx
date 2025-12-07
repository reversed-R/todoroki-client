import { Button } from "@/components/common/Button";
import { LabelBadge } from "@/components/label/LabelBadge";
import type { Label } from "@/types/label";
import { useNavigate, useSearch } from "@tanstack/react-router";
import styles from "./index.module.scss";
import { MenuBar } from "@/components/common/MenuBar";
import { UserRoleGuard } from "@/components/user/UserRoleGuard";
import { CheckboxGroup } from "@/components/common/form/CheckBoxGroup";
import { Checkbox } from "@/components/common/form/CheckBox";

type Props = {
  labels: Label[];
};

export function TodoMenuBar({ labels }: Props) {
  const navigate = useNavigate();
  const search = useSearch({ from: "/todos/" });

  return (
    <MenuBar defaultOpen={false} width={200}>
      <div>
        <UserRoleGuard>
          <Button
            onClick={() => {
              navigate({ to: "/todos/new" });
            }}
          >
            New Todo
          </Button>
        </UserRoleGuard>

        <section className={styles.sectionContainer}>
          <CheckboxGroup label="フィルタ">
            <Checkbox
              value={"完了済みを含める"}
              defaultChecked={search.includes_completed}
              onChange={(e) => {
                navigate({
                  to: "/todos",
                  search: {
                    includes_completed: e.target.checked,
                    includes_scheduled: search.includes_scheduled,
                  },
                });
              }}
            >
              <p>完了済みを含める</p>
            </Checkbox>
            <Checkbox
              value={"スケジュール付きを含める"}
              defaultChecked={search.includes_scheduled}
              onChange={(e) => {
                navigate({
                  to: "/todos",
                  search: {
                    includes_completed: search.includes_completed,
                    includes_scheduled: e.target.checked,
                  },
                });
              }}
            >
              <p>スケジュール付きを含める</p>
            </Checkbox>
          </CheckboxGroup>
        </section>

        <section className={styles.labelsContainer}>
          <h2 className={styles.labelsHeading}>ラベル一覧</h2>
          <div className={styles.labelBadgesContainer}>
            {labels.map((l) => (
              <LabelBadge key={l.id} label={l} />
            ))}
          </div>
        </section>

        <UserRoleGuard>
          <Button
            onClick={() => {
              navigate({ to: "/labels/new" });
            }}
          >
            New Label
          </Button>
        </UserRoleGuard>
      </div>
    </MenuBar>
  );
}
