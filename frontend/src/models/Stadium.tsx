import { Sport } from "./Sport";
import { Zone } from "./Zone"; // Ensure you import Zone

// Stadium.ts
export class Stadium {
    id: number | null = null;
    name: string | null = null;
    capacity: number | null = null;
    location: string | null = null;
    sport_id: Sport[] = [];
    zones: Zone[] = []; // Assuming a stadium has multiple zones

    constructor() {
        this.sport_id = [];
    }
}
