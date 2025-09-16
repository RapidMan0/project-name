import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  country?: string;

  @Column()
  userId: number;

  @OneToOne(() => User, user => user.location)
  @JoinColumn({ name: 'userId' })
  user: User;
}