import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    age?: number;

    @Column({ name: 'location_id', nullable: true })
    locationId?: number;

    @ManyToOne(() => Location)
    @JoinColumn({ name: 'location_id' })
    location?: Location;
}
