import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CatFact } from '@/types/CatFact';
import { getCatFacts } from '@/api/CatFact';
import { useTheme } from '@react-navigation/native';
import { useCatFact } from '@/contexts/CatFactContext';
import { router } from 'expo-router';

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
      <TouchableOpacity className="h-36 m-2 " onPress={() => handleCatFactPress(item)}>
        <ThemedView className="h-full w-full p-4 rounded-md">
          <ThemedText>
            {item.fact.length > 140
              ? item.fact.slice(0, 140) + '...'
              : item.fact}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  const listFooterComponent = () => {
    if (isLoading && displayItems && displayItems?.length > 0) {
      return <ThemedText>Loading...</ThemedText>;
    }
  };

  return (
    <ThemedView
      className="flex-1"
      style={dark ? { backgroundColor: '#000' } : { backgroundColor: '#ddd' }}
    >
      <ThemedView className="h-24 p-12">
        <ThemedText className="text-2xl font-bold">Cat Facts</ThemedText>
      </ThemedView>
      <FlatList
        data={displayItems}
        onEndReached={onEndReached}
        renderItem={renderItem}
        ListFooterComponent={listFooterComponent}
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={(item, index) => `${item.fact}-${index}`}
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
    gap: 8,
  },
});
