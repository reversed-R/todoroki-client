import { DoitUpdateForm } from "@/components/doit/DoitUpdateForm";
import { useAuth } from "@/context/auth";
import { $api } from "@/lib/openapi";
import {
  newDoitUpdateRequest,
  type Doit,
  type IDoitUpdateFormInput,
} from "@/types/doit";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/doits/$doit_id/edit/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { refreshIfExpired } = useAuth();
  refreshIfExpired();

  const { doit_id } = useParams({ from: "/doits/$doit_id/edit/" });
  const navigate = useNavigate();

  const { data: doits } = $api.client().useSuspenseQuery("get", "/doits");
  const doit = doits.find((t) => t.id === doit_id) as Doit;

  const patchDoit = $api.client().useMutation("patch", "/doits/{doit_id}", {
    onSuccess: () => {
      console.log("update doit succeeded");
      navigate({ to: "/doits" });
    },
    onError: () => {
      console.log("update doit failed");
    },
  });

  const onSubmit = (data: IDoitUpdateFormInput) => {
    patchDoit.mutate({
      params: {
        path: {
          doit_id: doit_id,
        },
      },
      body: newDoitUpdateRequest(data),
    });
  };

  return (
    <div>
      <section>
        <DoitUpdateForm
          doit={doit}
          onSubmit={onSubmit}
          onCancel={() => {
            navigate({ to: "/doits" });
          }}
        />
      </section>
    </div>
  );
}
