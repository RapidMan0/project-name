import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LocationsModule } from '../locations/locations.module'; // добавлено

@Module({
  imports: [LocationsModule], // добавлено
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
