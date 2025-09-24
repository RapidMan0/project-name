import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  country?: string;

  @OneToMany(() => User, user => user.location)
  users: User[];
}