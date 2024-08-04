import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import { Cart } from './cart/entity/cart';
import { CartItems } from './cart/entity/cartItems';
import { Orders } from './order/entity/orders';
import { User } from './users/entity/user';
import 'dotenv/config';

const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USERNAME ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE ?? 'postgres',
  synchronize: true,
  logging: true,
  entities: [Cart, CartItems, Orders, User],
  subscribers: [],
  migrations: [],
  ssl: { rejectUnauthorized: false },
};

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot(pgConfig),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
