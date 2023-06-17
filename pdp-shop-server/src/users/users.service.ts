import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './models/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dtos/user.dtos';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findById(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({id});
    }

    async create(user: CreateUserInput): Promise<User> {
        const userfromDB = await this.usersRepository.findOne({ where: {
            email: user.email
        }});
        if (userfromDB) {
            throw new ConflictException('User with this phone or email already exists');
        }
        return this.usersRepository.save(user);
    }
}
