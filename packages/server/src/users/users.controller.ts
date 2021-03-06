import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseInterceptors
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(
		@Body() createUserDto: CreateUserDto
	): Promise<{ id: string; username: string; fullName: string }> {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(':id')
	findById(@Param('id') id: string): Promise<User> {
		return this.usersService.findById(id);
	}

	@Delete(':id')
	deleteById(@Param('id') id: string): Promise<boolean> {
		return this.usersService.deleteById(id);
	}
}
