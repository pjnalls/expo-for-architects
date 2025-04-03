import { TouchableOpacity } from 'react-native';
import Accordion from '../Accordion';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

export default function CatAppHeader() {
  return (
    <ThemedView className="h-36 fixed top-10 z-50">
      <TouchableOpacity>
        <ThemedView className="bg-white rounded-full p-2">
          <Accordion title="User">
            <ThemedText>Settings</ThemedText>
            <ThemedText>Logout</ThemedText>
          </Accordion>
        </ThemedView>
      </TouchableOpacity>
    </ThemedView>
  );
}
