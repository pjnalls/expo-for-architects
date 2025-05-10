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
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CatBreed } from '@/types/Cat';

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
        className={`${className} border-2 ${
          dark
            ? 'border-gray-300 text-gray-300'
            : 'border-gray-700 text-gray-700'
        } rounded-md p-2 mb-4 px-3 h-10 w-full`}
        placeholder="Search for a breed"
        style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
        value={searchText}
        onChangeText={(value) => handleSearchText(value)}
        placeholderTextColor={`${dark ? '#667' : '#778'}`}
        maxLength={256}
      />
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
    <View
      className={`rounded-md p-2 flex-row items-center gap-2 ${
        dark ? 'bg-zinc-700' : 'bg-zinc-200'
      }`}
    >
      <IconSymbol name="square" color={`${dark ? '#ECEDEE' : '#11181C'}`} />
      <ThemedText>{name}</ThemedText>
    </View>
  );
}

export default function CatBreeds({
  filteredCatBreeds,
  setFilteredCatBreeds,
  catBreeds,
  setCatBreeds,
}: {
  filteredCatBreeds: CatBreed[] | undefined;
  setFilteredCatBreeds: (catBreeds: CatBreed[]) => void;
  catBreeds: CatBreed[] | undefined;
  setCatBreeds: (catBreeds: CatBreed[]) => void;
}) {
  const [searchText, setSearchText] = useState('');
  const { dark } = useTheme();

  const handleSearch = (text: string) => {
    setSearchText(text);
    const f = catBreeds?.filter((breed) =>
      breed.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCatBreeds(f || []);
  };

  const handleCatBreedChecked = (id?: string) => {
    const checkBreed = (breed: CatBreed) =>
      breed.id === id ? { ...breed, checked: !breed.checked } : breed;

    if (!id) return;

    setFilteredCatBreeds(filteredCatBreeds?.map(checkBreed) || []);
    setCatBreeds(catBreeds?.map(checkBreed) || []);
  };

  // const handleClear = () => {
  //   setSearchText('');
  //   setFilteredCatBreeds(CAT_BREEDS);
  //   setCatBreeds(CAT_BREEDS);
  // };

  return (
    <View className="w-full flex flex-col gap-2">
      <ThemedText type="default" className="w-full">
        Cat Breeds
      </ThemedText>
      <View className="flex flex-row justify-between gap-2 w-full">
        <SearchBar handleSearch={handleSearch} className="w-full" />
        {/*<ThemedButton
          title="Clear"
          onPress={handleClear}
          className="w-[17%] text-lg h-[36px] left-[-28px]"
        />*/}
      </View>
      {/([a-zA-Z ])+/.test(searchText) &&
        filteredCatBreeds &&
        filteredCatBreeds?.length > 0 && (
          <View
            className={`w-full max-h-[200px] border-[1px] ${
              dark ? 'border-grey-800' : 'border-[#111]'
            } rounded-md pb-2`}
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
        )}
    </View>
  );
}
