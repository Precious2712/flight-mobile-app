import { supabase } from "../../lib/superbase";
import { availableFlights } from "./flight-search";

export const seedFlights = async () => {
    const formattedFlights = availableFlights.map((flight) => ({
        flight_id: flight.flightId,
        airline: flight.airline,
        airline_code: flight.airlineCode,
        flight_number: flight.flightNumber,

        from_airport: flight.from, 
        to_airport: flight.to,     

        departure_date: flight.departureDate,
        departure_time: flight.departureTime,
        arrival_time: flight.arrivalTime,
        duration: flight.duration,

        cabin_classes: flight.cabinClasses, 
        baggage: flight.baggage,             

        refundable: flight.refundable,
        stops: flight.stops,
        status: flight.status,
    }));

    const { data, error } = await supabase
        .from("flights")
        .insert(formattedFlights);

    if (error) {
        console.error("Error seeding flights:", error);
        throw error;
    }

    console.log("Flights inserted successfully:", data);
};
