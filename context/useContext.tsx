import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { supabase } from '../lib/superbase'

type ProductContextType = {
    from: string
    to: string
    departureDate: string
    returnDate: string

    setFrom: (v: string) => void
    setTo: (v: string) => void
    setDepartureDate: (v: string) => void
    setReturnDate: (v: string) => void

    searchFlights: (field?: 'from' | 'to' | 'departure' | 'return_date') => Promise<void>
    handleSubmit: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const ilike = (column: string, value: string) => `${column}.ilike.%${value.trim()}%`


    const searchFlights = async (
        field?: 'from' | 'to' | 'departure' | 'return_date'
    ) => {
        let query = supabase
            .from('flights')
            .select('*')

        if (from && (!field || field === 'from')) {
            query = query.or(ilike('from_airport->>city', from))
        }

        if (to && (!field || field === 'to')) {
            query = query.or(ilike('to_airport->>city', to))
        }

        if (departureDate && (!field || field === 'departure')) {
            query = query.eq('departure_date', departureDate)
        }

        if (returnDate && (!field || field === 'departure')) {
            query = query.eq('return_date', returnDate)
        }

        const { data, error } = await query

        if (error) {
            console.error('Live search error:', error.message)
            return
        }

        console.log('Live results:', data)
    }


    const handleSubmit = async () => {
        let query = supabase
            .from('flights')
            .select('*')
        // .eq('status', 'AVAILABLE')

        if (from) {
            query = query.ilike(
                'from_airport->>city',
                `%${from.trim()}%`
            )
        }

        if (to) {
            query = query.ilike(
                'to_airport->>city',
                `%${to.trim()}%`
            )
        }

        if (departureDate) {
            query = query.eq('departure_date', departureDate)
        }

        if (returnDate) {
            query = query.eq('departure_date', returnDate)
        }

        console.log('Final combined search…')

        const { data, error } = await query

        if (error) {
            console.error('Search error:', error.message)
            return
        }

        console.log('Final results:', data)
    }



    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_IN" && session) {
                    console.log("Access Token:", session.access_token);
                    console.log("User ID:", session.user.id);
                }

                if (event === "SIGNED_OUT") {
                    console.log("User signed out");
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);




    return (
        <ProductContext.Provider
            value={{
                from,
                to,
                departureDate,
                returnDate,
                setFrom,
                setTo,
                setDepartureDate,
                setReturnDate,
                searchFlights,
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
