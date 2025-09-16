import { Module } from '@nestjs/common';
import { AppNameController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { DatabaseModule } from './modules/config/db/database.module';

@Module({
  imports: [UsersModule, LocationsModule, DatabaseModule],
  controllers: [AppNameController],
  providers: [AppService],
})
export class AppModule {}
