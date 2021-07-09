import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOne(loginDto.username);
    const match = await argon2.verify(user.password, loginDto.password);

    if (user && match) {
      return user;
    }

    return null;
  }

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOne(loginDto.username);
    const match = await argon2.verify(user.password, loginDto.password);

    if (user && match) {
      return user;
    }

    return null;
  }
}
