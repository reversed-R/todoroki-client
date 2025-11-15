import { LabelCreateForm } from "@/components/label/LabelCreateForm";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { newLabelRequest, type ILabelCreateFormInput } from "@/types/label";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/labels/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const navigate = useNavigate();

  const postLabel = $api.client().useMutation("post", "/labels", {
    onSuccess: () => {
      console.log("create label succeeded");
      navigate({ to: "/todos" });
    },
    onError: () => {
      console.log("create label failed");
    },
  });

  const onSubmit = (data: ILabelCreateFormInput) => {
    postLabel.mutate({
      body: newLabelRequest(data),
    });
  };

  return (
    <div>
      <section>
        <LabelCreateForm
          onSubmit={onSubmit}
          onCancel={() => {
            navigate({ to: "/todos" });
          }}
        />
      </section>
    </div>
  );
}
