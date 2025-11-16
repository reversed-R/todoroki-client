import type { components } from "@/schema";
import type { IFormInput } from "./form";

export type Todo = components["schemas"]["TodoResponse"];

export type TodoRequest = components["schemas"]["TodoRequest"];

export type TodoUpdateRequest = components["schemas"]["TodoUpdateCommand"];

export interface ITodoCreateFormInput extends IFormInput {
  name: string;
  alternative_name: string | null;
  description: string;
  is_public: boolean;
  scheduled_at: Date | null;
  labels: string[];
}

export function newTodoRequest({
  name,
  alternative_name,
  description,
  is_public,
  scheduled_at,
  labels,
}: ITodoCreateFormInput): TodoRequest {
  return {
    name,
    alternative_name,
    description,
    is_public,
    scheduled_at: scheduled_at?.toString(),
    labels: labels.map((id) => ({ id })),
  };
}

export interface ITodoUpdateFormInput extends IFormInput {
  name?: string;
  alternative_name?: string | null;
  description?: string;
  is_public?: boolean;
  scheduled_at?: Date | null;
}

export function newTodoUpdateRequest({
  name,
  alternative_name,
  description,
  is_public,
  scheduled_at,
}: ITodoUpdateFormInput): TodoUpdateRequest {
  return {
    name: name ? (name !== "" ? name : undefined) : undefined,
    alternative_name:
      alternative_name !== undefined
        ? alternative_name !== ""
          ? alternative_name
          : undefined
        : undefined,
    description: description
      ? description !== ""
        ? description
        : undefined
      : undefined,
    is_public,
    scheduled_at: scheduled_at?.toString(),
  };
}
