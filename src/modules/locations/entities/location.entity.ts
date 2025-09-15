export class Location {
  id: number;
  city: string;
  country?: string;
  userId: number;
  constructor(partial: Partial<Location>) {
    Object.assign(this, partial);
  }
}