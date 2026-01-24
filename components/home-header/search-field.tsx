import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useProduct } from '@/context/useContext'

export type TripType = 'oneWay' | 'roundTrip'

interface SearchFieldsProps {
  tripType: TripType
}

export default function SearchFields({ tripType }: SearchFieldsProps) {
  const {
    from,
    setFrom,
    to,
    setTo,
    // departureDate,
    // setDepartureDate,
    // returnDate,
    // setReturnDate,
    fromResults,
    toResults,
    handleSubmit,
  } = useProduct()

  return (
    <View style={styles.form}>
      {/* FROM */}
      <Input
        label="From"
        value={from}
        onChangeText={setFrom}
        placeholder="Departure city"
        iconName="mappin.and.ellipse"
      >
        <ScrollView>
          {fromResults.map((item, index) => (
            <Text
              key={index}
              style={styles.dropdownItem}
              onPress={() => setFrom(item.city)}
            >
              {item.city} ({item.airportCode})
            </Text>
          ))}
        </ScrollView>
      </Input>

      {/* TO */}
      <Input
        label="To"
        value={to}
        onChangeText={setTo}
        placeholder="Arrival city"
        iconName="mappin.and.ellipse"
      >
        <ScrollView>
          {toResults.map((item, index) => (
            <Text
              key={index}
              style={styles.dropdownItem}
              onPress={() => setTo(item.city)}
            >
              {item.city} ({item.airportCode})
            </Text>
          ))}
        </ScrollView>
      </Input>

      {/* DEPART */}
      {/* <Input
        label="Depart"
        value={departureDate}
        onChangeText={setDepartureDate}
        placeholder="YYYY-MM-DD"
        iconName="calendar"
      /> */}

      {/* RETURN */}
      {/* {tripType === 'roundTrip' && (
        <Input
          label="Return"
          value={returnDate}
          onChangeText={setReturnDate}
          placeholder="YYYY-MM-DD"
          iconName="calendar"
        />
      )} */}

      <Pressable style={styles.searchButton} onPress={handleSubmit}>
        <Text style={styles.searchText}>Search Flights</Text>
      </Pressable>
    </View>
  )
}

/* ================= INPUT ================= */

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  iconName,
  children,
}: any) {
  const [focused, setFocused] = useState(false)

  const showDropdown =
    focused && value?.length > 0 && React.Children.count(children) > 0

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputWrapper, focused && styles.focusedInput]}>
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

      {showDropdown && (
        <View style={styles.dropdownContainer}>{children}</View>
      )}
    </View>
  )
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  form: {
    gap: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  inputGroup: { gap: 6 },

  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 6,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#E5E7EB',
  },

  focusedInput: { borderColor: '#2563EB' },

  input: { flex: 1, fontSize: 14 },

  dropdownContainer: {
    maxHeight: 140, // ✅ FIXED HEIGHT
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    fontSize: 14,
  },

  searchButton: {
    marginTop: 10,
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  searchText: { color: '#fff', fontWeight: '700' },
})
