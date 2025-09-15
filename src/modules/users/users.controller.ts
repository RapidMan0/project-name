import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocationsService } from '../locations/locations.service';
import { Location } from '../locations/entities/location.entity'; // добавлено

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly locationsService: LocationsService,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto); //dto - data transfer object
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return users.map(user => {
      let location: Location | null = null; // тип явно указан
      if (user.locationId) {
        try {
          location = this.locationsService.findOne(user.locationId);
        } catch {
          location = null;
        }
      }
      return { ...user, location };
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/location') //am adaugat
  getLocation(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id); // выбросит NotFoundException, если юзер не найден
    if (!user.locationId) throw new NotFoundException(`Location for user #${id} not set`);
    return this.locationsService.findOne(user.locationId);
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
