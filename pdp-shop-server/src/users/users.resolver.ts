import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user';
import { UsersService } from './users.service';
import { UpdateResponse } from 'src/shared/models/update-response';
import { CreateUserInput } from './dtos/user.dtos';

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private usersService: UsersService,
    ) { }

    @Query(returns => [User])
    async allUsers() {
        return this.usersService.findAll();
    }

    @Query(returns => User)
    async userById(@Args('id', { type: () => String }) id: string) {
        return this.usersService.findById(id);
    }

    @Mutation(returns => User)
    async createUser(@Args('user') user: CreateUserInput) {
        console.log(user);
        return await this.usersService.create(user);
    }
}
