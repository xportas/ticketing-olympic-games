import { Sit } from "./Sit";
import { Sport } from "./Sport";
import { User } from "./User";
import { Zone } from "./Zone";

// Ticket.ts
export class Ticket {
    id: number | null;
    type: string | null;
    price: number | null;
    date: Date | null;
    users: User[];
    sit: Sit | null;
    sport: Sport | null;
    zone: Zone | null;

    constructor({
        id = null,
        type = null,
        price = null,
        date = null,
        users = [],
        sit = null,
        sport = null,
        zone = null,
    }: {
        id?: number | null,
        type?: string | null,
        price?: number | null,
        date?: Date | null,
        users?: User[],
        sit?: Sit | null,
        sport?: Sport | null,
        zone?: Zone | null,
    } = {}) {
        this.id = id === undefined ? null : id;
        this.type = type === undefined ? null : type;
        this.price = price === undefined ? null : price;
        this.date = date === undefined ? null : date;
        this.users = users === undefined ? [] : users;
        this.sit = sit === undefined ? null : sit;
        this.sport = sport === undefined ? null : sport;
        this.zone = zone === undefined ? null : zone;
    }
}
