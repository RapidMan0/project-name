import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocationsService } from '../locations/locations.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly locationsService: LocationsService,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return Promise.all(users.map(async user => {
      let location: import('../locations/entities/location.entity').Location | null = null;
      if (user.locationId) {
        try {
          location = await this.locationsService.findOne(user.locationId);
        } catch {
          location = null;
        }
      }
      return { ...user, location };
    }));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    let location: import('../locations/entities/location.entity').Location | null = null;
    if (user.locationId) {
      try {
        location = await this.locationsService.findOne(user.locationId);
      } catch {
        location = null;
      }
    }
    return { ...user, location };
  }

  @Get(':id/location')
  async getLocation(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user.locationId) throw new NotFoundException(`Location for user #${id} not set`);
    return await this.locationsService.findOne(user.locationId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
