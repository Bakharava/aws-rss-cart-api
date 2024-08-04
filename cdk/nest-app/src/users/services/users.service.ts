import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity/user';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private users: Repository<User>,
  ) {}

  async findOne(name: string): Promise<User> {
    return await this.users.findOne({ where: { name } });
  }

  async createOne({ name, password }: User): Promise<User> {
    return await this.users.save({ name, password });
  }

}
