import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Accordion from '@/components/Accordion';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Media } from '@/constants/Media';

export default function CatAppHeader() {
  const { dark } = useTheme();
  return (
    <ThemedView
      className="fixed pt-12 z-40 w-full"
      style={{
        backgroundColor: dark
          ? Colors.dark.background
          : Colors.light.background,
      }}
    >
      <TouchableOpacity>
        <ThemedView className="p-2">
          <Accordion title="User" className="max-w-3xl mx-auto w-full">
            <ThemedText>Settings</ThemedText>
            <ThemedText>Logout</ThemedText>
          </Accordion>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}
