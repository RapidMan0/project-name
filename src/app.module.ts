import { Module } from '@nestjs/common';
import { AppNameController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    LocationsModule,
  ],
  controllers: [AppNameController],
  providers: [AppService],
})
export class AppModule {}
