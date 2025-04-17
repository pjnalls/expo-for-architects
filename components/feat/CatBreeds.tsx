import { useTheme } from '@react-navigation/native';
import { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ThemedButton from '@/components/ThemedButton';

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

function SearchBar({
  handleSearch,
  className,
}: {
  handleSearch: (text: string) => void;
  className?: string;
}) {
  const { dark } = useTheme();
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  return (
    <View className={`flex-row items-center ${className}`}>
      <TextInput
        className={`${
          dark ? 'bg-[#ccc]' : 'bg-[#ddd]'
        } p-2 py-1 w-[87%] h-[32px] text-black text-lg`}
        placeholder="Search for a breed"
        style={{ borderBottomLeftRadius: 6, borderTopLeftRadius: 6 }}
        value={searchText}
        onChangeText={(value) => handleSearchText(value)}
        placeholderTextColor={`${dark ? '#667' : '#778'}`}
        maxLength={256}
      />
      <View
        className={`${
          dark ? 'bg-[#ccc]' : 'bg-[#ddd]'
        } p-2 py-1 h-[32px] w-[13%]`}
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
  const { dark } = useTheme();

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

  const handleClear = () => {
    setSearchText('');
    setFilteredCatBreeds(CAT_BREEDS);
    setCatBreeds(CAT_BREEDS);
  };

  return (
    <ThemedView className="flex-row flex-wrap gap-6 w-full">
      <View className="flex-row gap-2 items-center w-full">
        <SearchBar handleSearch={handleSearch} className="w-4/5" />
        <ThemedButton
          text="Clear"
          onPress={handleClear}
          className="w-1/5 text-lg h-[32px]"
        />
      </View>
      <View
        className={`w-full h-[240px] border-[1px] ${
          dark ? 'border-[#eee]' : 'border-[#111]'
        } rounded-md`}
      >
        <ScrollView>
          {filteredCatBreeds?.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="p-2 pt-2 pb-0"
              onPress={() => handleCatBreedChecked(item.id)}
            >
              <CatBreedItem name={item.name} checked={item.checked} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ThemedView>
  );
}
