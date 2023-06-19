import { ConflictException, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { User, UserWithToken } from './models/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, LoginDTO } from './dtos/user.dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }


    async login({email, pass}: LoginDTO): Promise<UserWithToken> {
        const user = await this.validateUser(email, pass);
        if (!user) throw new UnauthorizedException('Wrong email or pass');
        const userWithToken = {
            ...user,
            token: this.jwtService.sign({ email: user.email, sub: user.id })
        }
        return userWithToken;
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find({ loadEagerRelations: true });
    }

    findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { id },
            relations: {
                orders: true
            },
            loadEagerRelations: true,
        });
    }

    findOneByUniqueField(key: string, value: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { [key]: value },
            relations: {
                orders: true
            },
            loadEagerRelations: true,
        });
    }

    async create(user: CreateUserDTO): Promise<User> {
        const userfromDB = await this.usersRepository.findOne({
            where: {
                email: user.email
            }
        });
        if (userfromDB) {
            throw new ConflictException('User with this phone or email already exists');
        }
        user.pass = await this.hashPassword(user.pass);
        return this.usersRepository.save(user);
    }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.findOneByUniqueField('email', email);
        return user && await bcrypt.compare(pass, user.pass) ? user : null;
    }

    async hashPassword(pass: string): Promise<string> {
        return bcrypt.hash(pass, 10);
    }

    async comparePassword(pass: string, hash: string): Promise<boolean> {
        return bcrypt.compare(pass, hash);
    }
}
