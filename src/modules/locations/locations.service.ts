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

  async findByUserId(userId: number): Promise<Location> {
    const loc = await this.locationsRepository.findOne({ where: { userId } });
    if (!loc) throw new NotFoundException(`Location for user #${userId} not found`);
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