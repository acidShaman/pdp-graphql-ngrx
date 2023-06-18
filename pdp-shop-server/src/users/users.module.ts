import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { UsersResolver } from './users.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/shared/constants/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    UsersService,
    UsersResolver,
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
