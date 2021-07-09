import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findByUsername(loginDto.username);

    if (!user) throw new NotFoundException('user not found');

    const match = await argon2.verify(user.password, loginDto.password);

    if (!match) throw new UnauthorizedException('wrong password');

    return user;
  }

  async register(
    registerDto: RegisterDto
  ): Promise<{ access_token: string; id: string; username: string }> {
    const user = await this.usersService.create(registerDto);
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username
    };
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ access_token: string; id: string; username: string }> {
    const user = await this.validateUser(loginDto);
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username
    };
  }

  async me(id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
