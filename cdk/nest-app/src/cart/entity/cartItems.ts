import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Cart } from './cart';

@Entity()
export class CartItems {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    cart_id: string;

    @ManyToOne(() => Cart)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart: Cart;

    @Column({ type: 'uuid', nullable: false })
    product_id: string;

    @Column({ type: 'integer', nullable: false, default: 1 })
    price: number;

    @Column({ type: 'integer', nullable: false })
    count: number;
}