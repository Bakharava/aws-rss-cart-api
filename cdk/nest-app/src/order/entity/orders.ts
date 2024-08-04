import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Cart } from '../../cart/entity/cart';
import { User } from '../../users/entity/user';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @Column({ type: 'uuid', nullable: false })
    user_id: string;

    @OneToOne(() => Cart)
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart: Cart;

    @Column({ type: 'uuid', nullable: false })
    cart_id: string;

    @Column({ type: 'json', nullable: true })
    payment: string;

    @Column({ type: 'json', nullable: true })
    delivery: string;

    @Column({ type: 'text', nullable: true })
    comments: string;

    @Column({ type: 'text', nullable: true })
    status: string;

    @Column({ type: 'integer', nullable: true })
    total: number;
}