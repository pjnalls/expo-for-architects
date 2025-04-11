import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCatFact } from '@/contexts/CatFactContext';
import CatBreeds from '@/components/feat/CatBreeds';



export default function CatFactScreen() {
  // const item = useLocalSearchParams();
  const { catFact } = useCatFact();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="cat"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cat Fact</ThemedText>
      </ThemedView>
      <ThemedText>{catFact?.fact}</ThemedText>
      <CatBreeds />
    </ParallaxScrollView>
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
    gap: 8,
  },
});
