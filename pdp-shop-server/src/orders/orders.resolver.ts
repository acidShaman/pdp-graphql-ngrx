import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/order.dto';
import { Order } from './models/order';

@Resolver(of => Order)
export class OrdersResolver {
    constructor(
        private ordersService: OrdersService,
    ) { }

    @Query(returns => [Order])
    async allOrders() {
        return this.ordersService.findAll();
    }

    @Query(returns => [Order])
    async ordersByUserId(@Args('id', { type: () => String }) id: string) {
        return this.ordersService.findAllByUserId(id);
    }

    @Query(returns => Order)
    async product(@Args('id', { type: () => String }) id: string) {
        return this.ordersService.findById(id);
    }

    // @Mutation(returns => UpdateResponse)
    // async updateOrder(@Args('product') product: UpdateOrderDTO) {
    //     await this.ordersService.updateOrder(product);
    //     return new UpdateResponse();
    // }

    @Mutation(returns => Order)
    async createOrder(@Args('order') order: CreateOrderDTO) {
        return await this.ordersService.createOrder(order);
    }
}
