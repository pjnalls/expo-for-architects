import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { getRandomCatFact } from '@/api/CatFact';

type CatFact = {
  fact: string;
  length: number;
}

export default function CatFactView() {
  const [catFact, setCatFact] = useState<CatFact | undefined>(undefined);
  const { dark } = useTheme();
  const themeStyle = dark ? { color: '#fff' } : { color: '#000' };

  const handleGetCatFact = async () => {
    const data = await getRandomCatFact();
    setCatFact(data);
  }

  useEffect(() => {
    handleGetCatFact();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, themeStyle]}>A Random Cat Fact</Text>
      <TouchableOpacity onPress={handleGetCatFact} style={[styles.button, { backgroundColor: dark ? '#014a7b' : '#61dafb' }]}>
        <Text style={[styles.buttonText, themeStyle]}>Get Cat Fact</Text>
      </TouchableOpacity>
      <Text style={[styles.fact, themeStyle]}>{catFact ? catFact.fact : 'Get a cat fact'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20
  },
  fact: {
    fontSize: 16
  },
  buttonText: {
    fontSize: 16
  }
});
