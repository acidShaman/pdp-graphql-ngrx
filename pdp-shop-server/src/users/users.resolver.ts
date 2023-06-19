import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserWithToken } from './models/user';
import { UsersService } from './users.service';
import { UpdateResponse } from 'src/shared/models/update-response';
import { CreateUserDTO, LoginDTO } from './dtos/user.dtos';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { GqlAuthGuard } from 'src/shared/guards/gql-auth.guard';
import { LoginSuccessDTO } from 'src/shared/models/login-success';

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private usersService: UsersService,
    ) { }

    @Query(returns => UserWithToken)
    async login(@Args('login') login: LoginDTO) {
        const user = await this.usersService.login(login);
        console.log(user)
        return user;
    }

    @Query(returns => [User])
    async allUsers() {
        return this.usersService.findAll();
    }

    @Query(returns => User)
    async userById(@Args('id', { type: () => String }) id: string) {
        const user = await this.usersService.findById(id);
        console.log(user);
        return user;
    }

    @Mutation(returns => User)
    async createUser(@Args('user') user: CreateUserDTO) {
        return await this.usersService.create(user);
    }
}
