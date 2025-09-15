import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  private locations: Location[] = [
    new Location({ id: 1, city: 'Moscow', country: 'Russia', userId: 1 }),
    new Location({ id: 2, city: 'Saint Petersburg', country: 'Russia', userId: 2 }),
    new Location({ id: 3, city: 'Balti', country: 'Moldova', userId: 3 })
  ];
  private nextId: number;

  constructor() {
    // вычисляем следующий id как max(existing ids) + 1, чтобы избежать дубликатов
    this.nextId = this.locations.reduce((max, l) => Math.max(max, l.id ?? 0), 0) + 1;
  }

  create(dto: CreateLocationDto) {
    const location = new Location({ id: this.nextId++, ...dto });
    this.locations.push(location);
    return location;
  }

  findAll() {
    return this.locations;
  }

  findOne(id: number) {
    const loc = this.locations.find(l => l.id === id);
    if (!loc) throw new NotFoundException(`Location #${id} not found`);
    return loc;
  }

  findByUserId(userId: number) {
    const loc = this.locations.find(l => l.userId === userId);
    if (!loc) throw new NotFoundException(`Location for user #${userId} not found`);
    return loc;
  }

  update(id: number, dto: UpdateLocationDto) {
    const loc = this.findOne(id);
    Object.assign(loc, dto);
    return loc;
  }

  remove(id: number) {
    const index = this.locations.findIndex(l => l.id === id);
    if (index === -1) throw new NotFoundException(`Location #${id} not found`);
    return this.locations.splice(index, 1)[0];
  }
}