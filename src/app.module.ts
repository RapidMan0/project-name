import { Module } from '@nestjs/common';
import { AppNameController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'user228',
      database: 'labone',
      autoLoadEntities: true,
      synchronize: true, // true только для разработки!
    }),
    UsersModule,
    LocationsModule,
  ],
  controllers: [AppNameController],
  providers: [AppService],
})
export class AppModule {}
