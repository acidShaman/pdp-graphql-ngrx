import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Order } from './models/order';
import { CreateOrderInput } from './dtos/order.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        private usersService: UsersService

    ) { }

    findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    findById(id: string): Promise<Order | null> {
        return this.ordersRepository.findOneBy({ id });
    }

    async findAllByUserId(customerId: string): Promise<Order[]> {
        if (!await this.usersService.findById(customerId)) {
            throw new NotFoundException('Category not found')
        }
        return this.ordersRepository.find({ where: { customerId } });
    }

    createOrder(product: CreateOrderInput): Promise<Order> {
        return this.ordersRepository.save(product);
    }
}
