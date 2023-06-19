import { gql } from "apollo-angular";
import { User } from "./user";
import { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  price: string;
  active: boolean;
  sizes: string[];
  colors: string[];
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  likedByUsers: User[] | null;
}

export interface UpdateProductDTO {
  id: string;
  name: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  price: string;
  active: boolean;
  sizes: string[];
  colors: string[];
}

export interface CreateProductDTO {
  name: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  price: string;
  active: boolean;
  sizes: string[];
  colors: string[];
}

export interface AddToFavoritesDTO {
  productId: string;
  userId: string;
}

export const createProduct = gql`
  mutation createProduct($product: CreateProductDTO!) {
  createProduct(product: $product) {
    id
    name
    email
    address
    pass
    phone
    role
  }
}
`;

export const updateProduct = gql`
  mutation updateProduct($product: UpdateProductDTO!) {
  updateProduct(product: $product) {
    id
    name
    email
    address
    pass
    phone
    role
  }
}
`;

export const addProductToFavorites = gql`
  mutation addToFavorites($like: AddToFavoritesDTO!) {
    addToFavorites(like: $like) {
      success
  }
}
`;

export const getProducts = gql`
  query allProducts {
    allProducts {
        id
    name
    categoryId
    imageUrl
    description
    price
    active
    sizes
    colors
    createdAt
    updatedAt
    category
    likedByUsers
  }
}
`;

export const getProductById = gql`
  query product($id: String!) {
    product(id: $id) {
    id
    name
    categoryId
    imageUrl
    description
    price
    active
    sizes
    colors
    createdAt
    updatedAt
    category
    likedByUsers
  }
}`;

export const getProductsByCategoryId = gql`
  query product($id: String!) {
    product(id: $id) {
    id
    name
    categoryId
    imageUrl
    description
    price
    active
    sizes
    colors
    createdAt
    updatedAt
    category
    likedByUsers
  }
}`;