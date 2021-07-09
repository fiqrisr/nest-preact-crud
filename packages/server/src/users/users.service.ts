import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as argon from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: string; username: string; fullName: string }> {
    const user = new User();
    user.username = createUserDto.username;
    user.fullName = createUserDto.fullName;
    user.password = await argon.hash(createUserDto.password);

    await this.usersRepository.save(user);

    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
    };
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async deleteById(id: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ id });

    if (user) {
      await this.usersRepository.remove(user);
      return true;
    }

    return false;
  }
}
