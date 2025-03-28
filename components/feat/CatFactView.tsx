import { Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { getRandomCatFact } from '@/api/CatFact';
import { CatFact } from '@/types/CatFact';

export default function CatFactView() {
  const [catFact, setCatFact] = useState<CatFact | undefined>(undefined);
  const { dark } = useTheme();
  const themeStyle = dark ? { color: '#fff' } : { color: '#000' };

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
      <TouchableOpacity
        onPress={handleGetCatFact}
        className="bg-blue-500 rounded-md p-2 items-center justify-center"
        style={{ backgroundColor: dark ? '#014a7b' : '#61dafb' }}
      >
        <Text style={themeStyle}>Get Cat Fact</Text>
      </TouchableOpacity>
      <Text style={themeStyle}>
        {catFact ? catFact.fact : 'Get a cat fact'}
      </Text>
    </View>
  );
}
