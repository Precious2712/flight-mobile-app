export interface Airport {
    city: string;
    airportCode: string;
}

export interface CabinClass {
    type: "Economy" | "Business" | "First";
    price: number;
    seatsAvailable: number;
}

export interface Baggage {
    cabin: string;
    checked: string;
}

export interface Flight {
    flightId: string;
    airline: string;
    airlineCode: string;
    flightNumber: string;
    from: Airport;
    to: Airport;
    departureDate: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    cabinClasses: CabinClass[];
    baggage: Baggage;
    refundable: boolean;
    stops: number;
    status: "AVAILABLE" | "SOLD_OUT" | "DELAYED";
}



export const availableFlights = [
    {
        flightId: "FL001",
        airline: "Air Peace",
        airlineCode: "P4",
        flightNumber: "P47101",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Abuja", airportCode: "ABV" },
        departureDate: "2026-02-10",
        departureTime: "06:30",
        arrivalTime: "07:45",
        duration: "1h 15m",
        cabinClasses: [
            { type: "Economy", price: 82000, seatsAvailable: 20 },
            { type: "Business", price: 140000, seatsAvailable: 5 }
        ],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL002",
        airline: "Ibom Air",
        airlineCode: "QI",
        flightNumber: "QI202",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Uyo", airportCode: "QUO" },
        departureDate: "2026-02-10",
        departureTime: "08:00",
        arrivalTime: "09:20",
        duration: "1h 20m",
        cabinClasses: [{ type: "Economy", price: 78000, seatsAvailable: 25 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL003",
        airline: "Arik Air",
        airlineCode: "W3",
        flightNumber: "W3705",
        from: { city: "Abuja", airportCode: "ABV" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "10:30",
        arrivalTime: "11:45",
        duration: "1h 15m",
        cabinClasses: [{ type: "Economy", price: 80000, seatsAvailable: 18 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL004",
        airline: "Dana Air",
        airlineCode: "9J",
        flightNumber: "9J354",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Owerri", airportCode: "QOW" },
        departureDate: "2026-02-10",
        departureTime: "12:00",
        arrivalTime: "13:05",
        duration: "1h 05m",
        cabinClasses: [{ type: "Economy", price: 75000, seatsAvailable: 22 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL005",
        airline: "United Nigeria",
        airlineCode: "UN",
        flightNumber: "UN512",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Enugu", airportCode: "ENU" },
        departureDate: "2026-02-10",
        departureTime: "14:00",
        arrivalTime: "15:10",
        duration: "1h 10m",
        cabinClasses: [{ type: "Economy", price: 77000, seatsAvailable: 19 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL006",
        airline: "Air Peace",
        airlineCode: "P4",
        flightNumber: "P47120",
        from: { city: "Port Harcourt", airportCode: "PHC" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "07:15",
        arrivalTime: "08:30",
        duration: "1h 15m",
        cabinClasses: [{ type: "Economy", price: 83000, seatsAvailable: 21 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL007",
        airline: "Ibom Air",
        airlineCode: "QI",
        flightNumber: "QI215",
        from: { city: "Abuja", airportCode: "ABV" },
        to: { city: "Uyo", airportCode: "QUO" },
        departureDate: "2026-02-10",
        departureTime: "09:45",
        arrivalTime: "11:05",
        duration: "1h 20m",
        cabinClasses: [{ type: "Economy", price: 79000, seatsAvailable: 23 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL008",
        airline: "Arik Air",
        airlineCode: "W3",
        flightNumber: "W3720",
        from: { city: "Benin", airportCode: "BNI" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "11:30",
        arrivalTime: "12:20",
        duration: "50m",
        cabinClasses: [{ type: "Economy", price: 72000, seatsAvailable: 26 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL009",
        airline: "Dana Air",
        airlineCode: "9J",
        flightNumber: "9J410",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Calabar", airportCode: "CBQ" },
        departureDate: "2026-02-10",
        departureTime: "13:45",
        arrivalTime: "15:00",
        duration: "1h 15m",
        cabinClasses: [{ type: "Economy", price: 76000, seatsAvailable: 24 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL010",
        airline: "United Nigeria",
        airlineCode: "UN",
        flightNumber: "UN530",
        from: { city: "Asaba", airportCode: "ABB" },
        to: { city: "Abuja", airportCode: "ABV" },
        departureDate: "2026-02-10",
        departureTime: "16:00",
        arrivalTime: "17:10",
        duration: "1h 10m",
        cabinClasses: [{ type: "Economy", price: 74000, seatsAvailable: 20 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL011",
        airline: "Air Peace",
        airlineCode: "P4",
        flightNumber: "P47135",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Ilorin", airportCode: "ILR" },
        departureDate: "2026-02-10",
        departureTime: "07:00",
        arrivalTime: "08:05",
        duration: "1h 05m",
        cabinClasses: [{ type: "Economy", price: 70000, seatsAvailable: 28 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL012",
        airline: "Ibom Air",
        airlineCode: "QI",
        flightNumber: "QI240",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Benin", airportCode: "BNI" },
        departureDate: "2026-02-10",
        departureTime: "09:20",
        arrivalTime: "10:10",
        duration: "50m",
        cabinClasses: [{ type: "Economy", price: 68000, seatsAvailable: 30 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL013",
        airline: "Arik Air",
        airlineCode: "W3",
        flightNumber: "W3780",
        from: { city: "Owerri", airportCode: "QOW" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "11:00",
        arrivalTime: "12:05",
        duration: "1h 05m",
        cabinClasses: [{ type: "Economy", price: 76000, seatsAvailable: 22 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL014",
        airline: "Dana Air",
        airlineCode: "9J",
        flightNumber: "9J488",
        from: { city: "Abuja", airportCode: "ABV" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "13:30",
        arrivalTime: "14:45",
        duration: "1h 15m",
        cabinClasses: [{ type: "Economy", price: 81000, seatsAvailable: 17 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL015",
        airline: "United Nigeria",
        airlineCode: "UN",
        flightNumber: "UN545",
        from: { city: "Enugu", airportCode: "ENU" },
        to: { city: "Abuja", airportCode: "ABV" },
        departureDate: "2026-02-10",
        departureTime: "15:10",
        arrivalTime: "16:20",
        duration: "1h 10m",
        cabinClasses: [{ type: "Economy", price: 79000, seatsAvailable: 19 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL016",
        airline: "Air Peace",
        airlineCode: "P4",
        flightNumber: "P47160",
        from: { city: "Calabar", airportCode: "CBQ" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "16:30",
        arrivalTime: "17:50",
        duration: "1h 20m",
        cabinClasses: [{ type: "Economy", price: 84000, seatsAvailable: 21 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL017",
        airline: "Ibom Air",
        airlineCode: "QI",
        flightNumber: "QI255",
        from: { city: "Uyo", airportCode: "QUO" },
        to: { city: "Abuja", airportCode: "ABV" },
        departureDate: "2026-02-10",
        departureTime: "18:00",
        arrivalTime: "19:25",
        duration: "1h 25m",
        cabinClasses: [{ type: "Economy", price: 83000, seatsAvailable: 18 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL018",
        airline: "Arik Air",
        airlineCode: "W3",
        flightNumber: "W3795",
        from: { city: "Lagos", airportCode: "LOS" },
        to: { city: "Port Harcourt", airportCode: "PHC" },
        departureDate: "2026-02-10",
        departureTime: "19:10",
        arrivalTime: "20:25",
        duration: "1h 15m",
        cabinClasses: [{ type: "Economy", price: 85000, seatsAvailable: 16 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL019",
        airline: "Dana Air",
        airlineCode: "9J",
        flightNumber: "9J499",
        from: { city: "Asaba", airportCode: "ABB" },
        to: { city: "Lagos", airportCode: "LOS" },
        departureDate: "2026-02-10",
        departureTime: "20:00",
        arrivalTime: "21:00",
        duration: "1h",
        cabinClasses: [{ type: "Economy", price: 72000, seatsAvailable: 27 }],
        baggage: { cabin: "7kg", checked: "15kg" },
        refundable: true,
        stops: 0,
        status: "AVAILABLE"
    },

    {
        flightId: "FL020",
        airline: "United Nigeria",
        airlineCode: "UN",
        flightNumber: "UN560",
        from: { city: "Abuja", airportCode: "ABV" },
        to: { city: "Ilorin", airportCode: "ILR" },
        departureDate: "2026-02-10",
        departureTime: "21:30",
        arrivalTime: "22:35",
        duration: "1h 05m",
        cabinClasses: [{ type: "Economy", price: 71000, seatsAvailable: 24 }],
        baggage: { cabin: "7kg", checked: "20kg" },
        refundable: false,
        stops: 0,
        status: "AVAILABLE"
    }

];
