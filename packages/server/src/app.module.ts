import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () =>
				Object.assign(await getConnectionOptions(), {
					autoLoadEntities: true,
					synchronize: true
				})
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
