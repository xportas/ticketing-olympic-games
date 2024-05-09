// Objeto 1: Stadium y Sport
import { Stadium } from "./Stadium";
import { Sport } from "./Sport";
import { Ticket } from "./Ticket";
import { User } from "./User";
import { Slot } from "./Slot";

const stadium1 = new Stadium();
stadium1.id = 1;
stadium1.name = "Stadium A";
stadium1.capacity = 50000;
stadium1.location = "City A";

const sport1 = new Sport();
sport1.id = 1;
sport1.name = "Football";
sport1.description = "Football match";
sport1.stadium = stadium1;

const sport2 = new Sport();
sport2.id = 2;
sport2.name = "Basketball";
sport2.description = "Basketball match";
sport2.stadium = stadium1;

const sport3 = new Sport();
sport3.id = 3;
sport3.name = "Baseball";
sport3.description = "Baseball match";
sport3.stadium = stadium1;


// Objeto 2: Ticket y User
const user1 = new User();
user1.id = 1;
user1.email = "user1@example.com";
user1.roles = ["user"];
user1.password = "password";
user1.picture = "user1.jpg";
user1.tokenAuth = "token1";
user1.name = "User 1";

const ticket1 = new Ticket();
ticket1.id = 1;
ticket1.type = "Regular";
ticket1.price = 50;
ticket1.sport = sport3;
ticket1.date = new Date("2024-04-20");
ticket1.users.push(user1);
user1.tickets.push(ticket1);

const slot1 = new Slot();
slot1.id = 1;
slot1.dateStart = new Date("2024-04-17T10:00:00");
slot1.dateEnd = new Date("2024-04-17T12:00:00");

const slot2 = new Slot();
slot2.id = 2;
slot2.dateStart = new Date("2024-04-21T15:00:00");
slot2.dateEnd = new Date("2024-04-23T17:00:00");
slot2.sports.push(sport1);
slot2.sports.push(sport2);

const user2 = new User();
user2.id = 2;
user2.email = "user2@example.com";
user2.roles = ["admin"];
user2.password = "password123";
user2.picture = "user2.jpg";
user2.tokenAuth = "token2";
user2.name = "User 2";
user2.slots.push(slot1); 
user2.slots.push(slot2);   



const ticket2_1 = new Ticket();
ticket2_1.id = 21;
ticket2_1.type = "VIP";
ticket2_1.price = 100;
ticket2_1.date = new Date("2024-04-17T10:30:00");
ticket2_1.sport = sport1;
ticket2_1.users.push(user2);
user2.tickets.push(ticket2_1);
slot1.users.push(user2);


const ticket2_2 = new Ticket();
ticket2_2.id = 22;
ticket2_2.type = "Regular";
ticket2_2.price = 50;
ticket2_2.date = new Date("2024-04-18T16:00:00");
ticket2_2.sport = sport2;
ticket2_2.users.push(user2);
user2.tickets.push(ticket2_2);
slot2.users.push(user2);

const userWithSlots = {
    id: 1,
    email: "user@example.com",
    roles: ["ROLE_USER"],
    password: "hashedPassword",
    picture: "https://example.com/user.jpg",
    tokenAuth: "token123",
    name: "John Doe",
    slots: [
        {
            id: 1,
            dateStart: new Date("2024-04-11T14:00:00"),
            dateEnd: new Date("2024-04-18T15:00:00"),
            users: [],
            sports: [],
        },
        {
            id: 2,
            dateStart: new Date("2024-04-13T09:00:00"),
            dateEnd: new Date("2024-04-20T10:00:00"),
            users: [],
            sports: [],
        },
        {
            id: 3,
            dateStart: new Date("2024-04-15T14:00:00"),
            dateEnd: new Date("2024-04-22T15:00:00"),
            users: [],
            sports: [],
        },
        {
            id: 4,
            dateStart: new Date("2024-04-17T09:00:00"),
            dateEnd: new Date("2024-04-24T10:00:00"),
            users: [],
            sports: [],
        },
    ],
    tickets: [
        {
            id: 1,
            type: "VIP",
            price: 100,
            date: new Date("2024-04-12T14:00:00"),
            users: [],
            sit: null,
            sport: null,
        },
    ],
};

// Usuario sin ranuras
const userWithoutSlots: User = {
    id: 2,
    email: "user2@example.com",
    roles: ["ROLE_USER"],
    password: "hashedPassword2",
    picture: "https://example.com/user2.jpg",
    tokenAuth: "token456",
    name: "Jane Smith",
    slots: [],
    tickets: [
        {
            id: 2,
            type: "Standard",
            price: 50,
            date: new Date("2024-04-13T09:00:00"),
            users: [],
            sit: null,
            sport: null,
        },
        {
            id: 3,
            type: "Standard",
            price: 50,
            date: new Date("2024-04-14T09:00:00"),
            users: [],
            sit: null,
            sport: null,
        },
    ],
};


export { stadium1, sport1, user1, ticket1, user2, slot1, slot2, ticket2_1, ticket2_2, userWithSlots, userWithoutSlots};