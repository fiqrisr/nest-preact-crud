import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
	@IsNotEmpty()
	@MinLength(4)
	username: string;

	@IsNotEmpty()
	fullName: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
