import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { IconSymbol } from '@/components/ui/icon-symbol'
import type { ComponentProps } from 'react'
import { AirportOption, useProduct } from '@/context/useContext'

export type TripType = 'oneWay' | 'roundTrip'

export default function SearchFields({ tripType }: { tripType: TripType }) {
  const {
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
    handleSubmit,
    searchLoading,
  } = useProduct()

  return (
    <View style={styles.form}>
      <Input
        label="From"
        value={from}
        placeholder="Departure city"
        iconName="mappin.and.ellipse"
        results={fromResults}
        selected={fromSelected}
        onChangeText={(v) => {
          setFrom(v)
          setFromSelected(false)
        }}
        onSelect={(item) => {
          setFrom(item.city)
          setFromSelected(true)
        }}
      />

      <Input
        label="To"
        value={to}
        placeholder="Arrival city"
        iconName="mappin.and.ellipse"
        results={toResults}
        selected={toSelected}
        onChangeText={(v) => {
          setTo(v)
          setToSelected(false)
        }}
        onSelect={(item) => {
          setTo(item.city)
          setToSelected(true)
        }}
      />

      <Pressable
        style={[styles.searchButton, searchLoading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={searchLoading}
      >
        {searchLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.searchText}>Search Flights</Text>
        )}
      </Pressable>
    </View>
  )
}

/* ================= INPUT ================= */

function Input({
  label,
  value,
  placeholder,
  iconName,
  results = [],
  selected = false,
  onChangeText,
  onSelect,
}: {
  label: string
  value: string
  placeholder: string
  iconName: ComponentProps<typeof IconSymbol>['name']
  results?: AirportOption[]
  selected?: boolean
  onChangeText: (v: string) => void
  onSelect: (item: AirportOption) => void
}) {
  const showDropdown =
    value.trim().length > 0 &&
    results.length > 0 &&
    !selected

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <IconSymbol name={iconName} size={18} color="#9CA3AF" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />
      </View>

      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled
            showsVerticalScrollIndicator
          >
            {results.map((item) => (
              <Pressable
                key={item.airportCode}
                onPress={() => onSelect(item)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>
                  {item.city} ({item.airportCode})
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
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

  input: { flex: 1, fontSize: 14 },

  dropdownContainer: {
    maxHeight: 220,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#fff',
  },

  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
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
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  searchText: { color: '#fff', fontWeight: '700' },
})
