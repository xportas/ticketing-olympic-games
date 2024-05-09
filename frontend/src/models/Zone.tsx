// models/Zone.ts
import { Sit } from "./Sit"; // Assuming you have a Sit model

export class Zone {
    id: number | null = null;
    name: string | null = null;
    description: string | null = null;
    price_multiplier: number | null = null;
    availableSitsCount: number | null = null;
    sits: Sit[] = []; // Assuming each zone has multiple sits

    constructor() {
        this.sits = [];
    }
}
