import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Order } from './models/order';
import { CreateOrderDTO, OrderPosition } from './dtos/order.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        private usersService: UsersService,
        private dataSource: DataSource,
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

    async createOrder(orderDto: CreateOrderDTO): Promise<Order> {
        const user = await this.usersService.findById(orderDto.customerId);
        if (!user) throw new NotFoundException('User not found');
        return await this.ordersRepository.save(Object.assign({}, {
            ...orderDto,
            address: user.address,
            totalPrice: orderDto.positions.reduce((totalPrice, position) => totalPrice + position.price, 0),
            positions: JSON.stringify(orderDto.positions)
        }) as any);;
    }
}
