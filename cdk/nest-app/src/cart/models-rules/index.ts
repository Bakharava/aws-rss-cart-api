import { Cart } from '../entity/cart';
import { CartItems } from '../entity/cartItems';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart
      ? cart.items.reduce((acc: number, { price, count }: CartItems) => {
        return acc + price * count;
      }, 0)
      : 0;
}
