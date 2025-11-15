import type { components } from "@/schema";
import type { IFormInput } from "./form";

export type Label = components["schemas"]["LabelResponse"];

export type LabelRequest = components["schemas"]["LabelRequest"];

export interface ILabelCreateFormInput extends IFormInput {
  name: string;
  description: string;
  color: string | null;
}

export function newLabelRequest({
  name,
  description,
  color,
}: ILabelCreateFormInput): LabelRequest {
  return {
    name,
    description,
    color,
  };
}
