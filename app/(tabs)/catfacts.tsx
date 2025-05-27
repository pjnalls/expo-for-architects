import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CatFact } from '@/types/Cat';
import { getCatFacts } from '@/api/endpoints/vendors/CatFact';
import { useTheme } from '@react-navigation/native';
import { useCatFact } from '@/contexts/CatFactContext';
import { router } from 'expo-router';
import { Media } from '@/constants/Media';
import { Colors } from '@/constants/Colors';
import ThemedContainer from '@/components/ThemedContainer';

export default function CatFactsScreen() {
  const { dark } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayItems, setDisplayItems] = useState<CatFact[] | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchItems = async () => {
    setIsLoading(true);
    const data = await getCatFacts(page);
    setPage(page + 1);
    setDisplayItems((items) => (items ? items.concat(data ?? []) : data ?? []));
    setIsLoading(false);
  };

  const { setCatFact } = useCatFact();

  const handleCatFactPress = (fact: CatFact) => {
    setCatFact(fact);
    router.push('/catfact');
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const onEndReached = () => {
    if (!isLoading) {
      fetchItems();
    }
  };

  const listEmptyComponent = () => {
    if (!isLoading && displayItems?.length === 0) {
      return <ThemedText>Nothing to show</ThemedText>;
    }
  };

  const renderItem = ({ item }: { item: CatFact }) => {
    return (
      <TouchableOpacity
        className="h-36 my-2"
        onPress={() => handleCatFactPress(item)}
      >
        <View
          className={`w-full h-full border-[1px] ${
            dark ? 'bg-zinc-800 border-gray-600' : 'bg-zinc-100 border-gray-400'
          } rounded-lg p-4`}
        >
          <ThemedText>
            {item.fact.length > 140
              ? item.fact.slice(0, 140) + '...'
              : item.fact}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  const listFooterComponent = () => {
    if (isLoading && displayItems && displayItems?.length > 0) {
      return <ThemedText>Loading...</ThemedText>;
    }
  };

  return (
    <ThemedContainer>
      <ThemedView className="pt-36">
        <ThemedText
          type="title"
          style={{ textAlign: 'center' }}
        >
          Cat Facts
        </ThemedText>
      </ThemedView>
      <FlatList
        data={displayItems}
        onEndReached={onEndReached}
        renderItem={renderItem}
        ListFooterComponent={listFooterComponent}
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={(item, index) => `${item.fact}-${index}`}
      />
    </ThemedContainer>
  );
}
