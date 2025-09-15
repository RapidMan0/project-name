export class User {
    id: number;
    name: string;
    email?: string;
    locationId?: number; // добавлено

    constructor(partial: Partial<User>) { //partial makes all properties optional
        Object.assign(this, partial); //assigns the properties of the partial object to the instance
    }
}
