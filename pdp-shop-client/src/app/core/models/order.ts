import { gql } from "apollo-angular";
import { User } from "./user";

export enum OrderStatus {
  DRAFT = 'DRAFT',
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS'
}

export interface Order {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  address: string;
  customer: User;
  customerId: string;
  positions: string;
}

export interface CreateOrderDTO {
  address: string;
  customerId: string;
  positions: OrderPosition[];
  totalPrice: number;
}


export interface OrderPosition {
  size: string;
  color: string;
  productId: string;
  price: number;
}


export const getAllOrders = gql`
  query allOrders {
    allOrders {
      id
      status
      createdAt
      updatedAt
      totalPrice
      address
      customerId
      positions
  }
}
`;

export const getOrdersByUserId = gql`
  query ordersByUserId($id: String!) {
    ordersByUserId(id: $id!) {
      id
      status
      createdAt
      updatedAt
      totalPrice
      address
      customer {
        id
        email
      }
      customerId
      positions
  }
}
`;

export const createOrder = gql`
  mutation createOrder($order: CreateOrderDTO!) {
  createOrder(order: $order) {
    id
    status
    createdAt
    updatedAt
    totalPrice
    address
    customer
    customerId
    positions
  }
}
`;