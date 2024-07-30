import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../entity/cart';
import { CartItems } from '../entity/cartItems';
import { CartStatuses } from '../models';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
      @InjectRepository(CartItems) private cartItemsRepository: Repository<CartItems>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartsRepository.findOne({
      relations: {
        items: true,
      },
      where: { user_id: userId, status: CartStatuses.OPEN },
    });
  }

  async createByUserId(userId: string) {
    return await this.cartsRepository.save({
      user_id: userId,
      items: [],
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

      return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { product, count }): Promise<Cart> {
    const { id } = await this.findOrCreateByUserId(userId);

    const cartItem = await this.cartItemsRepository.findOne({
      where: { cart_id: id, product_id: product.id },
    });

    if (cartItem) {
      if (count === 0) {
        await this.cartItemsRepository.delete(cartItem.id);

        return await this.cartsRepository.findOne({
          relations: {
            items: true,
          },
          where: { id },
        });
      }

      await this.cartItemsRepository.update(cartItem.id, {
        count: count,
      });

      return await this.cartsRepository.findOne({
        relations: {
          items: true,
        },
        where: { id },
      });
    }

    await this.cartItemsRepository.save({
      cart_id: id,
      product_id: product.id,
      price: product.price,
      count: count,
    });

    return await this.cartsRepository.findOne({
      relations: {
        items: true,
      },
      where: { id },
    });
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartsRepository.delete({ user_id: userId });
  }

  async setOrderStatus(userId: string, status: string): Promise<Cart> {
    const cart = await this.findByUserId(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    return await this.cartsRepository.save({
      ...cart,
      status,
    });
  }
}
