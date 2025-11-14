import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { Header } from "@/components/Header";
import { BaseLayout } from "@/components/layout/BaseLayout";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <BaseLayout>
        <Outlet />
      </BaseLayout>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
