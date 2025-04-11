import { useTheme } from '@react-navigation/native';
import { useState } from 'react';

import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const CAT_BREEDS: CatBreed[] = [
  { id: '1', name: 'Persian', checked: false },
  { id: '2', name: 'Siamese', checked: false },
  { id: '3', name: 'Maine Coon', checked: false },
  { id: '4', name: 'Ragdoll', checked: false },
  { id: '5', name: 'Sphynx', checked: false },
  { id: '6', name: 'Abyssinian', checked: false },
  { id: '7', name: 'American Shorthair', checked: false },
  { id: '8', name: 'British Shorthair', checked: false },
];

type CatBreed = {
  id?: string;
  name: string;
  checked: boolean;
};

function SearchBar({ handleSearch }: { handleSearch: (text: string) => void }) {
  const { dark } = useTheme();
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  return (
    <View className="w-full flex-row items-center">
      <TextInput
        className={`${
          dark ? 'bg-[#ccc]' : 'bg-[#ddd]'
        } p-2 py-1 w-[90%] h-[32px] text-black text-lg`}
        placeholder="Search for a breed"
        style={{ borderBottomLeftRadius: 6, borderTopLeftRadius: 6 }}
        value={searchText}
        onChangeText={(value) => handleSearchText(value)}
        placeholderTextColor={`${dark ? '#667' : '#778'}`}
      />
      <View
        className={`${
          dark ? 'bg-[#ccc]' : 'bg-[#ddd]'
        } p-2 py-1 h-[32px] w-[10%]`}
        style={[
          {
            borderBottomRightRadius: 6,
            borderTopRightRadius: 6,
          },
        ]}
      >
        <IconSymbol name="magnifyingglass" color="#888" size={25} />
      </View>
    </View>
  );
}

function CatBreedItem({ name, checked }: CatBreed) {
  const { dark } = useTheme();

  return checked ? (
    <View
      className={`${
        dark ? 'bg-[#6EA]' : 'bg-[#174]'
      } rounded-md p-2 flex-row items-center gap-2`}
    >
      <IconSymbol name="checkmark" color={`${!dark ? '#7FB' : '#142'}`} />
      <Text className={`${!dark ? 'text-[#7FB]' : 'text-[#142]'} text-lg`}>
        {name}
      </Text>
    </View>
  ) : (
    <ThemedView className="rounded-md p-2 flex-row items-center gap-2">
      <IconSymbol name="square" color={`${dark ? '#ECEDEE' : '#11181C'}`} />
      <ThemedText>{name}</ThemedText>
    </ThemedView>
  );
}

export default function CatBreeds() {
  const [, setSearchText] = useState('');
  const [filteredCatBreeds, setFilteredCatBreeds] = useState<
    CatBreed[] | undefined
  >(CAT_BREEDS);
  const [catBreeds, setCatBreeds] = useState<CatBreed[] | undefined>(
    CAT_BREEDS
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    const f = catBreeds?.filter((breed) =>
      breed.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCatBreeds(f);
  };

  const handleCatBreedChecked = (id?: string) => {
    const checkBreed = (breed: CatBreed) =>
      breed.id === id ? { ...breed, checked: !breed.checked } : breed;

    if (!id) return;

    setFilteredCatBreeds(filteredCatBreeds?.map(checkBreed));
    setCatBreeds(catBreeds?.map(checkBreed));
  };

  return (
    <ThemedView className="flex-row flex-wrap gap-2">
      <SearchBar handleSearch={handleSearch} />
      {filteredCatBreeds?.map(({ name, checked, id }) => (
        <TouchableOpacity
          className="w-full"
          key={`CatBreedItem-${name}-${id}`}
          onPress={() => {
            handleCatBreedChecked(id);
          }}
        >
          <CatBreedItem name={name} checked={checked} />
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}
