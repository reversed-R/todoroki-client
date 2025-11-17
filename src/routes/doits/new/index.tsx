import { DoitCreateForm } from "@/components/doit/DoitCreateForm";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import { newDoitRequest, type IDoitCreateFormInput } from "@/types/doit";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/doits/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const navigate = useNavigate();

  const postDoit = $api.client().useMutation("post", "/doits", {
    onSuccess: () => {
      console.log("create Do it! succeeded");
      navigate({ to: "/doits" });
    },
    onError: () => {
      console.log("create Do it! failed");
    },
  });

  const onSubmit = (data: IDoitCreateFormInput) => {
    postDoit.mutate({
      body: newDoitRequest(data),
    });
  };

  return (
    <div>
      <section>
        <DoitCreateForm
          onSubmit={onSubmit}
          onCancel={() => {
            navigate({ to: "/doits" });
          }}
        />
      </section>
    </div>
  );
}
