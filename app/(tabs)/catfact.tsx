import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCatFact } from '@/contexts/CatFactContext';
import { useTheme } from '@react-navigation/native';

type CatBreed = {
  id?: string;
  name: string;
  checked: boolean;
};

function CatBreedItem({ name, checked }: CatBreed) {
  const { dark } = useTheme();
  return checked ? (
    <View className={`${dark ? 'bg-[#6EA]' : 'bg-[#174]'} rounded-md p-2`}>
      <Text className={`${!dark ? 'text-[#7FB]' : 'text-[#142]'} text-lg`}>
        ✓ {name}
      </Text>
    </View>
  ) : (
    <ThemedView className='rounded-md p-2'>
      <ThemedText>❏ {name}</ThemedText>
    </ThemedView>
  );
}

export default function CatFactScreen() {
  // const item = useLocalSearchParams();
  const { catFact } = useCatFact();
  const [catBreeds, setCatBreeds] = useState<CatBreed[] | undefined>(undefined);

  const handleCatBreedChecked = (id?: string) => {
    if (!id) return;
    setCatBreeds(
      catBreeds?.map((breed) =>
        breed.id === id ? { ...breed, checked: !breed.checked } : breed
      )
    );
  };

  useEffect(() => {
    setCatBreeds([
      { id: '1', name: 'Persian', checked: false },
      { id: '2', name: 'Siamese', checked: false },
      { id: '3', name: 'Maine Coon', checked: false },
      { id: '4', name: 'Ragdoll', checked: false },
      { id: '5', name: 'Sphynx', checked: false },
    ]);
  }, []);

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
      {catBreeds?.map(({ name, checked, id }) => (
        <TouchableOpacity
          key={`CatBreedItem-${name}-${id}`}
          onPress={() => {
            handleCatBreedChecked(id);
          }}
        >
          <CatBreedItem
            name={name}
            checked={checked}
          />
        </TouchableOpacity>
      ))}
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
