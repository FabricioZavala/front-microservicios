import { Category } from "./category.interface";

export interface Equipment {
    _id: string;
    name: string;
    description?: string;
    status: string;
    categoryId?: string;
    categoryInfo?: Category;
  }
  