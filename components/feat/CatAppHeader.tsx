import { TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Accordion from '@/components/Accordion';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CatAppHeader() {
  const { dark } = useTheme();
  return (
    <ThemedView
      className="fixed pt-12 z-40"
      style={{ backgroundColor: dark ? '#000' : '#fff' }}
    >
      <TouchableOpacity>
        <ThemedView className="p-2">
          <Accordion title="User">
            <ThemedText>Settings</ThemedText>
            <ThemedText>Logout</ThemedText>
          </Accordion>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}
