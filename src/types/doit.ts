import type { components } from "@/schema";
import type { IFormInput } from "./form";

export type Doit = components["schemas"]["DoitResponse"];

export type DoitRequest = components["schemas"]["DoitRequest"];

export type DoitUpdateRequest = components["schemas"]["DoitUpdateCommand"];

export interface IDoitCreateFormInput extends IFormInput {
  name: string;
  alternative_name: string | null;
  description: string;
  is_public: boolean;
  deadlined_at: Date | null;
  labels: string[];
}

export function newDoitRequest({
  name,
  alternative_name,
  description,
  is_public,
  deadlined_at,
  labels,
}: IDoitCreateFormInput): DoitRequest {
  return {
    name,
    alternative_name,
    description,
    is_public,
    deadlined_at: deadlined_at?.toString(),
    labels: labels.map((id) => ({ id })),
  };
}

export interface IDoitUpdateFormInput extends IFormInput {
  name?: string;
  alternative_name?: string | null;
  description?: string;
  is_public?: boolean;
  deadlined_at?: Date | null;
}

export function newDoitUpdateRequest({
  name,
  alternative_name,
  description,
  is_public,
  deadlined_at,
}: IDoitUpdateFormInput): DoitUpdateRequest {
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
    deadlined_at: deadlined_at?.toString(),
  };
}
