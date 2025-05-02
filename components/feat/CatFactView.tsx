import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';

import { getRandomCatFact } from '@/api/endpoints/CatFact';
import { useCatFact } from '@/contexts/CatFactContext';
import ThemedButton from '@/components/ThemedButton';

export default function CatFactView() {
  const { dark } = useTheme();
  const themeStyle = dark ? { color: '#fff' } : { color: '#000' };
  const { catFact, setCatFact } = useCatFact();

  const handleGetCatFact = async () => {
    const data = await getRandomCatFact();
    setCatFact(data);
  };

  useEffect(() => {
    handleGetCatFact();
  }, []);

  return (
    <View className="gap-2 mb-2">
      <Text className="text-xl font-bold" style={themeStyle}>
        A Random Cat Fact
      </Text>
      <ThemedButton title="Get Cat Fact" onPress={handleGetCatFact} />
      <Text style={themeStyle}>
        {catFact ? catFact.fact : 'Get a cat fact'}
      </Text>
    </View>
  );
}
