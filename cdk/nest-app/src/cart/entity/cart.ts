import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CartItems } from './cartItems';
import { User } from '../../users/entity/user';
import { CartStatuses } from '../models';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @OneToMany(() => CartItems, (cartItems) => cartItems.cart)
    items: CartItems[];

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: false })
    updated_at: Date;

    @Column({
        type: 'enum',
        enum: CartStatuses,
        default: CartStatuses.OPEN,
    })
    status: string;
}