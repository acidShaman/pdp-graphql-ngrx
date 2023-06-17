import { registerEnumType } from "@nestjs/graphql";

export enum OrderStatus {
    DRAFT = 'draft',
    NEW = 'new',
    IN_PROGRESS = 'in_progress'
}

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
});