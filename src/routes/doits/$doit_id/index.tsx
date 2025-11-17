import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/doits/$doit_id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/doits/$doit_id/"!</div>;
}
