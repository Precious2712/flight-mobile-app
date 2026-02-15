import { User } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import Toast from 'react-native-toast-message'
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

    fromSelected: boolean
    toSelected: boolean
    setFromSelected: (v: boolean) => void
    setToSelected: (v: boolean) => void

    finalResults: Flight[]
    searchLoading: boolean;
    open: boolean;

    user: User | null
    authLoading: boolean
    handleLogout: () => Promise<void>
    handleSubmit: () => Promise<void>
    // setFinalResults: React.Dispatch<React.SetStateAction<Flight[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const [fromResults, setFromResults] = useState<AirportOption[]>([])
    const [toResults, setToResults] = useState<AirportOption[]>([])

    const [fromSelected, setFromSelected] = useState(false)
    const [toSelected, setToSelected] = useState(false)

    const [finalResults, setFinalResults] = useState<Flight[]>([])
    const [searchLoading, setSearchLoading] = useState(false)

    const [user, setUser] = useState<User | null>(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [open, setOpen] = useState(false)

    const router = useRouter()


    useEffect(() => {
        if (!from.trim()) {
            setFromResults([])
            setFromSelected(false)
            return
        }

        setFromSelected(false)

        const timeout = setTimeout(async () => {
            const { data, error } = await supabase
                .from('flights')
                .select('from_airport')
                .ilike('from_airport', `%${from}%`)

            if (error || !data) return

            const map = new Map<string, AirportOption>()

            data.forEach((item: { from_airport: string }) => {
                const airport = JSON.parse(item.from_airport)
                map.set(airport.airportCode, {
                    city: airport.city,
                    airportCode: airport.airportCode,
                })
            })

            setFromResults(Array.from(map.values()))
        }, 300)

        return () => clearTimeout(timeout)
    }, [from])


    useEffect(() => {
        if (!to.trim()) {
            setToResults([])
            setToSelected(false)
            return
        }

        setToSelected(false)

        const timeout = setTimeout(async () => {
            const { data, error } = await supabase
                .from('flights')
                .select('to_airport')
                .ilike('to_airport', `%${to}%`)

            if (error || !data) return

            const map = new Map<string, AirportOption>()

            data.forEach((item: { to_airport: string }) => {
                const airport = JSON.parse(item.to_airport)
                map.set(airport.airportCode, {
                    city: airport.city,
                    airportCode: airport.airportCode,
                })
            })

            setToResults(Array.from(map.values()))
        }, 300)

        return () => clearTimeout(timeout)
    }, [to])


    const handleSubmit = async () => {
        if (!from || !to) {
            Toast.show({
                type: 'error',
                text1: 'From and To are required'
            })
            return
        }

        setSearchLoading(true)

        try {
            const { data, error } = await supabase
                .from('flights')
                .select('*')
                .or(
                    `from_airport.ilike.%${from}%,to_airport.ilike.%${to}%`
                )

            setFinalResults((data as Flight[]) ?? []);

            setOpen(true);

            console.log(data)
        } finally {
            setSearchLoading(false)
        }
    }


    useEffect(() => {
        const loadSession = async () => {
            const { data } = await supabase.auth.getSession()
            setUser(data.session?.user ?? null)
            setAuthLoading(false)
        }

        loadSession()

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => setUser(session?.user ?? null)
        )

        return () => listener.subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.push('/login')
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
                fromSelected,
                toSelected,
                setFromSelected,
                setToSelected,
                finalResults,
                handleSubmit,
                searchLoading,
                user,
                authLoading,
                handleLogout,
                // setFinalResults,
                setOpen,
                open
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
