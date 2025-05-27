import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ThemedView } from '../ThemedView';
import ThemedButton from '../ThemedButton';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { useTheme } from '@react-navigation/native';

export default function Maps() {
  const { dark } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [showRideOptions, setShowRideOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [pickupLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [dropoffLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    // Geocoder.init(GOOGLE_MAPS_API_KEY);
  }, []);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = async (text: string) => {
    if (text.length < 3) return; // Don't search for very short queries

    setIsLoading(true);
    try {
      // const response = await Geocoder.from(text)
      //   .then((data) => data)
      //   .catch(() => {
      //     return null;
      //   });

      // if (!response) return;
      // const { results } = response;

      // if (results && results.length > 0) {
      //   const { location } = results[0].geometry;
      //   const newLocation = {
      //     latitude: location.lat,
      //     longitude: location.lng,
      //   };

      // setDropoffLocation(newLocation);

      // // Animate map to the new location
      // mapRef.current?.animateToRegion({
      //   ...newLocation,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // });

      // Show ride options after finding location
      setShowRideOptions(true);
      // }
    } catch (error) {
      console.error('Geocoder error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const moveToCurrentLocation = () => {
    mapRef.current?.animateToRegion({
      latitude: pickupLocation.latitude,
      longitude: pickupLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  useEffect(() => {
    moveToCurrentLocation();
  }, [pickupLocation]);

  return (
      <ThemedView className="flex flex-1 max-w-3xl mx-auto w-full">
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={pickupLocation}
            title="Pickup Location"
            pinColor="blue"
          />
          {dropoffLocation && (
            <Marker
              coordinate={dropoffLocation}
              title="Dropoff Location"
              pinColor="red"
            />
          )}
        </MapView>
        {/* Search Bar */}
        <View className="absolute top-4 left-4 right-4">
          <View
            className={`flex-row items-center bg-white rounded-lg shadow-lg p-2 ${
              dark ? 'bg-zinc-800' : 'bg-white'
            }`}
          >
            <IconSymbol
              name="magnifyingglass"
              color={dark ? '#aaa' : '#667'}
              size={20}
            />
            <TextInput
              className={`flex-1 ml-2 ${dark ? 'text-white' : 'text-black'}`}
              placeholder="Where to?"
              placeholderTextColor={dark ? '#aaa' : '#667'}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
            {isLoading && <ActivityIndicator size="small" color="#333" />}
          </View>
        </View>

        {/* Current Location Button */}
        <TouchableOpacity
          className="absolute bottom-32 right-4 bg-white rounded-full p-3 shadow-lg"
          onPress={moveToCurrentLocation}
        >
          <IconSymbol name="location.fill" color={'#000'} size={24} />
        </TouchableOpacity>

        {/* Current Location Button */}
        <TouchableOpacity
          className="absolute bottom-32 right-24 bg-white rounded-full p-3 shadow-lg"
          onPress={() => handleSearch(searchText)}
        >
          <IconSymbol name="magnifyingglass" color={'#000'} size={24} />
        </TouchableOpacity>

        {/* Ride Options Bottom Sheet */}
        {showRideOptions && (
          <ThemedView
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 ${
              dark ? 'bg-zinc-800' : 'bg-white'
            }`}
          >
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
            <ThemedText className="text-xl font-bold mb-4">
              Choose a ride
            </ThemedText>
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <ThemedText className="text-lg">UberX</ThemedText>
                <ThemedText className="text-sm text-gray-500">
                  5 min away
                </ThemedText>
              </View>
              <ThemedText className="text-lg font-bold">$15.00</ThemedText>
            </View>
            <ThemedButton
              title="Request UberX"
              onPress={() => setShowRideOptions(false)}
              className="w-full"
            />
          </ThemedView>
        )}
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
