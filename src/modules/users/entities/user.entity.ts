import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
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
    locationId?: number;

    @OneToOne(() => Location, location => location.user, { cascade: true, eager: false })
    location?: Location;

    constructor(partial: Partial<User>) { //partial makes all properties optional
        Object.assign(this, partial); //assigns the properties of the partial object to the instance
    }
}
