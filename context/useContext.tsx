import { createContext, useContext, useState, ReactNode } from 'react';


type ProductContextType = {
    handleSubmit: () => void;
    setFrom: React.Dispatch<React.SetStateAction<string>>;
    setTo: React.Dispatch<React.SetStateAction<string>>;
    setDepartureDate: React.Dispatch<React.SetStateAction<string>>;
    setReturnDate: React.Dispatch<React.SetStateAction<string>>;
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const handleSubmit = async () => { };


    return (
        <ProductContext.Provider
            value={{
                handleSubmit,
                setFrom,
                from,
                to,
                setTo,
                departureDate,
                setDepartureDate,
                returnDate,
                setReturnDate
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('useProduct must be used inside ProductProvider');
    }

    return context;
}
