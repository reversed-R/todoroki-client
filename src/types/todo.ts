import type { components } from "@/schema";
import type { IFormInput } from "./form";

export type TodoRequest = components["schemas"]["Todo"];

export interface ITodoCreateFormInput extends IFormInput {
  name: string;
  alternative_name: string | null;
  description: string;
  is_public: boolean;
  scheduled_at: Date | null;
}

export function newTodoRequest({
  name,
  alternative_name,
  description,
  is_public,
  scheduled_at,
}: ITodoCreateFormInput): TodoRequest {
  return {
    name,
    alternative_name,
    description,
    is_public,
    scheduled_at: scheduled_at?.toString(),
  };
}
