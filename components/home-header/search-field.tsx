import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
} from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useProduct } from '@/context/useContext'


export type TripType = 'oneWay' | 'roundTrip'

export interface FlightSearchData {
    from: string
    to: string
    departDate: string
    returnDate?: string
}

interface SearchFieldsProps {
    tripType: TripType
}


export default function SearchFields({
    tripType,
}: SearchFieldsProps) {

    const { handleSubmit, from, setFrom, to, setTo, departureDate, setDepartureDate, returnDate, setReturnDate, searchFlights } = useProduct();

    return (
        <View style={styles.form}>

            <Input
                label="From"
                placeholder="Departure city"
                value={from}
                onChangeText={(text) => {
                    setFrom(text)
                    searchFlights('from')
                }}
                iconName="mappin.and.ellipse"
            >

            </Input>


            <Input
                label="To"
                placeholder="Arrival city"
                value={to}
                onChangeText={(text) => {
                    setTo(text)
                    searchFlights('to')
                }}
                iconName="mappin.and.ellipse"
            >

            </Input>


            <Input
                label="Depart"
                placeholder="YYYY-MM-DD"
                value={departureDate}
                onChangeText={(text) => {
                    setDepartureDate(text)
                    searchFlights('departure')
                }}
                iconName="calendar"
            />


            {tripType === 'roundTrip' && (
                <Input
                    label="Return"
                    placeholder="YYYY-MM-DD"
                    value={returnDate}
                    onChangeText={(text) => {
                    setReturnDate(text)
                    searchFlights('return_date')
                }}
                    iconName="calendar"
                />
            )}

            <Pressable style={styles.searchButton} onPress={handleSubmit}>
                <Text style={styles.searchText}>Search Flights</Text>
            </Pressable>
        </View>
    )
}



interface InputProps {
    label: string
    placeholder: string
    value: string
    onChangeText: (text: string) => void
    iconName: 'mappin.and.ellipse' | 'calendar'
    children?: React.ReactNode
}

function Input({
    label,
    placeholder,
    value,
    onChangeText,
    iconName,
    children,
}: InputProps) {
    const [focused, setFocused] = useState(false)

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>

            <View
                style={[
                    styles.inputWrapper,
                    focused && styles.focusedInput,
                ]}
            >
                <IconSymbol name={iconName} size={18} color="#9CA3AF" />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </View>


            {focused && children}
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        gap: 16,
        padding: 16,
    },

    inputGroup: {
        gap: 6,
    },

    label: {
        fontSize: 12,
        fontWeight: '500',
        color: '#374151',
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
    },

    focusedInput: {
        borderColor: '#2563EB',
    },

    input: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },

    dropdown: {
        marginTop: 6,
        borderRadius: 14,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },

    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },

    dropdownText: {
        fontSize: 14,
        color: '#111827',
    },

    searchButton: {
        marginTop: 10,
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },

    searchText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
})
