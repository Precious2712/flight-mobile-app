import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'
import { supabase } from '../lib/superbase'



export type AirportOption = {
    city: string
    airportCode: string
}

export type Baggage = {
    cabin: string
    checked: string
}

export type CabinClass = {
    type?: string
    price?: number
}

export type Flight = {
    id: string

    airline: string
    airline_code: string
    flight_id: string
    flight_number: string

    from_airport: string
    to_airport: string

    departure_date: string
    departure_time: string
    arrival_time: string
    duration: string

    stops: number
    status: 'AVAILABLE' | 'UNAVAILABLE'
    refundable: boolean

    baggage: Baggage
    cabin_classes: CabinClass[][]

    created_at: string
}



type ProductContextType = {
    from: string
    to: string

    setFrom: (v: string) => void
    setTo: (v: string) => void

    fromResults: AirportOption[]
    toResults: AirportOption[]

    finalResults: Flight[]   

    handleSubmit: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)



export function ProductProvider({ children }: { children: ReactNode }) {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const [fromResults, setFromResults] = useState<AirportOption[]>([])
    const [toResults, setToResults] = useState<AirportOption[]>([])

    const [finalResults, setFinalResults] = useState<Flight[]>([]) 


    useEffect(() => {
        if (!from.trim()) {
            setFromResults([])
            return
        }

        const searchFrom = async () => {
            const { data, error } = await supabase
                .from('flights')
                .select('from_airport')
                .ilike('from_airport', `%${from}%`)

            if (error || !data) return

            const parsed: AirportOption[] = data.map(
                (item: { from_airport: string }) => {
                    const airport: AirportOption = JSON.parse(item.from_airport)

                    return {
                        city: airport.city,
                        airportCode: airport.airportCode,
                    }
                }
            )

            console.log('PARSED FROM RESULTS:', parsed)
            setFromResults(parsed)
        }

        searchFrom()
    }, [from])

    

    useEffect(() => {
        if (!to.trim()) {
            setToResults([])
            return
        }

        const searchTo = async () => {
            const { data, error } = await supabase
                .from('flights')
                .select('to_airport')
                .ilike('to_airport', `%${to}%`)

            if (error || !data) return

            const parsed: AirportOption[] = data.map(
                (item: { to_airport: string }) => {
                    const airport: AirportOption = JSON.parse(item.to_airport)

                    return {
                        city: airport.city,
                        airportCode: airport.airportCode,
                    }
                }
            )

            setToResults(parsed)
        }

        searchTo()
    }, [to])


    
    const handleSubmit = async () => {
        console.log('===== SUBMIT CLICKED =====')
        console.log({ from, to })

        const { data, error } = await supabase
            .from('flights')
            .select('*')
            .ilike('from_airport', `%${from}%`)
            .ilike('to_airport', `%${to}%`)

        console.log('FINAL DATA:', data)
        console.log('FINAL ERROR:', error)

        if (!error && data) {
            setFinalResults(data as Flight[]) 
        }
    }

    return (
        <ProductContext.Provider
            value={{
                from,
                to,
                setFrom,
                setTo,
                fromResults,
                toResults,
                finalResults,     
                handleSubmit,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}



export function useProduct() {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProduct must be used inside ProductProvider')
    }
    return context
}
