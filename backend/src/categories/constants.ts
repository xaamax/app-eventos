import { CategoryDetails } from "./interfaces/category";

export const CATEGORY_FIELDS: Array<keyof CategoryDetails> = [
  'id',
  'category',
  'isDeleted',
  'createdAt',
  'updatedAt'
];
