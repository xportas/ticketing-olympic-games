import { Ticket } from "./Ticket";

// Sit.ts
export class Sit {
    id: number | null = null;
    zone: number | null = null;
    line: number | null = null;
    seat: number | null = null;
    Tickets: Ticket[] = [];

    constructor() {
        this.Tickets = [];
    }
}
