import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MapView from 'react-native-maps';

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex flex-1">
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 100.000,
          longitude: -100.000,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={false}
        showsMyLocationButton={true}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
