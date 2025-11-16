import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/$todo_id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/todos/$todo_id/"!</div>
}
