import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    const location = this.locationsRepository.create(dto);
    return await this.locationsRepository.save(location);
  }

  async findAll(): Promise<Location[]> {
    return await this.locationsRepository.find();
  }

  async findOne(id: number): Promise<Location> {
    const loc = await this.locationsRepository.findOne({ where: { id } });
    if (!loc) throw new NotFoundException(`Location #${id} not found`);
    return loc;
  }


  async findByLocationId(locationId: number): Promise<Location> {
    const loc = await this.locationsRepository.findOne({ where: { id: locationId } });
    if (!loc) throw new NotFoundException(`Location #${locationId} not found`);
    return loc;
  }

  async update(id: number, dto: UpdateLocationDto): Promise<Location> {
    const loc = await this.findOne(id);
    Object.assign(loc, dto);
    return await this.locationsRepository.save(loc);
  }

  async remove(id: number): Promise<Location> {
    const loc = await this.findOne(id);
    await this.locationsRepository.remove(loc);
    return loc;
  }
}