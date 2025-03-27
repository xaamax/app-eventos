import { CategoryDetails } from "src/categories/interfaces/category";

export interface EventDetails {
  locale: string;
  dateOfEvent: Date;
  theme: string;
  description?: string | null;
  speaker: string;
  amountPeople: number;
  category_id: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryDetails
}
