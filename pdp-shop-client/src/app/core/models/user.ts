import { gql } from 'apollo-angular';
import { Order } from './order';

export enum UserRoles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface CreateUserDTO {
  name: string;
  email: string;
  address: string;
  pass: string;
  phone: string;
  role: UserRoles;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  balance: number;
  phone: string;
  pass: string;
  address: string;
  imageUrl: string;
  favorites: Order[] | null;
  orders: Order[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithToken extends User {
  token: string;
}

export interface LoginDTO {
  email: string;
  pass: string;
}

export interface LoginSuccessDTO {
  token: string;
}

export const createUser = gql`
  mutation createUser($user: CreateUserDTO!) {
    createUser(user: $user) {
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

export const getUsers = gql`
  query allUsers {
    allUsers {
      id
      name
      email
      address
      pass
      phone
      role
      balance
      orders
      favorites
    }
  }
`;

export const getUserById = gql`
  query userById($id: String) {
    userById(id: $id) {
      id
      name
      email
      address
      pass
      phone
      role
      balance
      orders
      favorites
    }
  }
`;

export const LOGIN = gql`
  query login($login: LoginDTO!) {
    login(login: $login) {
      id
      name
      email
      role
      balance
      phone
      address
      imageUrl
      favorites {
        id
        name
        categoryId
        imageUrl
        description
        price
        active
        sizes
        colors
      }
      orders {
        id
        status
        createdAt
        updatedAt
        totalPrice
        address
        positions
      }
      createdAt
      updatedAt
      token
    }
  }
`;
