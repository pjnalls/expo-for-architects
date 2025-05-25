import { StyleSheet, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCatFact } from '@/contexts/CatFactContext';
import ThemedTextInput from '@/components/ThemedTextInput';
import { useState } from 'react';
import { getClassification } from '@/api/endpoints/Nlp';
import { Cat } from '@/types/Cat';
import ThemedButton from '@/components/ThemedButton';

export default function CatFactScreen() {
  // const item = useLocalSearchParams();
  const { catFact } = useCatFact();
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleClassifyName = async () => {
    setOrigin('');

    const cat: Cat = {
      firstName: name,
      lastName: 'Leon',
      email: 'leon@gmail.com',
      birthDate: new Date().toISOString(),
      catBreed: [
        {
          name: 'Persian',
          checked: true,
        },
      ],
    };

    setIsLoading(true);
    const origin = await getClassification(cat);
    setOrigin(origin ?? 'Unknown');
    setIsLoading(false);
  };

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
      <ThemedText>{`${catFact?.fact.substring(0, 100)}...`}</ThemedText>
      <ThemedView>
        <ThemedText>Hey AI, where does this cat</ThemedText>
        <ThemedTextInput
          onChangeText={handleNameChange}
          label="name"
          value={name}
          isValid={/[A-Za-z]+/.test(name)}
          errorMessage="Please enter a valid name"
        />
        <ThemedText>come from?</ThemedText>
        <ThemedButton
          onPress={handleClassifyName}
          disabled={isLoading || !name || name.length < 3}
          title="Classify Name"
        ></ThemedButton>
        {!isLoading && origin ? (
          <ThemedView style={{ height: 200, marginTop: 20 }}>
            <ThemedText type="title" style={{ textAlign: 'center' }}>
              {`🤖:\n`}
            </ThemedText>
            <ThemedText style={{ textAlign: 'center' }}>{origin}</ThemedText>
          </ThemedView>
        ) : isLoading && !origin ? (
          <ThemedView style={{ height: 200, marginTop: 20 }}>
            <ThemedText>{'AI Classifying Name...'}</ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={{ height: 200, marginTop: 20 }}>
            <ThemedText>{'Please enter a name and click the button.'}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
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
