import { Slot } from "./Slot";
import { Stadium } from "./Stadium";
import { Ticket } from "./Ticket";

// Sport.ts
export class Sport {
    id: number | null = null;
    name: string | null = null;
    price: number | null = null;
    description: string | null = null;
    Tickets: Ticket[] = [];
    stadium: Stadium | null = null;
    slot_id: Slot[] = [];
    date: Date | null = null;

    constructor() {
        this.Tickets = [];
        this.slot_id = [];
    }
}
