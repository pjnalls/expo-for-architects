import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from './ThemedText';

type ThemedButtonProps = {
  label: string;
  className?: string;
  onChangeText: (text: string) => void;
  value: string;
};

export default function ThemedTextInput({
  label,
  className,
  onChangeText,
  value,
}: ThemedButtonProps) {
  const { dark } = useTheme();

  return (
    <View className='w-full'>
      <ThemedText className="mb-2 text-lg">{label}</ThemedText>
      <TextInput
        className={`${className} border-2 ${
          dark ? 'border-gray-300 text-gray-300' : 'border-gray-700 text-gray-700'
        } rounded-md p-2 mb-4 px-3 h-10 w-full`}
        maxLength={256}
        onChangeText={onChangeText}
        autoCapitalize="none"
        value={value}
      />
    </View>
  );
}
