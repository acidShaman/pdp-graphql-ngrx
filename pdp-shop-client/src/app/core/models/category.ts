import { gql } from "apollo-angular";
import { Product } from "./product";

export interface UpdateCategoryDTO {
    id: string;
    name: string;
    imageUrl: string;
}

export interface CreateCategoryDTO {
    name: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    products: Product[] | null;
}

export const createCategory = gql`
  mutation createCategory($category: CreateCategoryDTO!) {
  createCategory(category: $category) {
    id
    name
    imageUrl
    createdAt
    updatedAt
  }
}
`;

export const updateCategory = gql`
  mutation updateCategory($category: UpdateCategoryDTO!) {
  updateCategory(category: $category) {
    success
  }
}
`;

export const getAllCategories = gql`
  query allCategories {
    allCategories {
    id
    name
    imageUrl
    createdAt
    updatedAt
    products {
        id
        name
        price
    }
  }
}
`;

export const getCategoryById = gql`
  query category($id: String!) {
    category(id: $id) {
    id
    name
    imageUrl
    createdAt
    updatedAt
    products {
        id
        name
        price
    }
  }
}
`;
