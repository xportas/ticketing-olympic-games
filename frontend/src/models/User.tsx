import { Slot } from "./Slot";
import { Ticket } from "./Ticket";

// User.ts
export class User {
    id: number | null = null;
    email: string | null = null;
    roles: string[] = [];
    password: string | null = null;
    slots: Slot[] = [];
    tickets: Ticket[] = [];
    picture: string | null = null;
    tokenAuth: string | null = null;
    name: string | null = null;

    constructor() {
        this.slots = [];
        this.tickets = [];
    }
}
