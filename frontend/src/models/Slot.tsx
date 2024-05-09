import { Sport } from "./Sport";
import { User } from "./User";

// Slot.ts
export class Slot {
    id: number | null = null;
    dateStart: Date | null = null;
    dateEnd: Date | null = null;
    users: User[] = [];
    sports: Sport[] = [];

    constructor() {
        this.users = [];
        this.sports = [];
    }
}
