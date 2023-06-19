import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './models/category';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), JwtModule],
  providers: [CategoriesService, CategoriesResolver],
  exports: [CategoriesService]
})
export class CategoriesModule {}
