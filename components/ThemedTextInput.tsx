import { View, TextInput, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ThemedTextInputProps = {
  label: string;
  className?: string;
  onChangeText: (text: string) => void;
  value: string;
  isValid: boolean;
  errorMessage: string;
};

export default function ThemedTextInput({
  label,
  className,
  onChangeText,
  value,
  isValid,
  errorMessage,
}: ThemedTextInputProps) {
  const { dark } = useTheme();
  const hasError = value.length > 0 && !isValid;
  const getErrorColor = (prop: 'text' | 'border') =>
    `${
      dark && hasError
        ? `${prop}-red-400`
        : !dark && hasError
        ? `${prop}-red-700`
        : dark
        ? `${prop}-gray-300`
        : `${prop}-gray-700}`
    }`;

  return (
    <View className="w-full">
      <Text className={`mb-2 text-lg ${getErrorColor('text')}`}>{label}</Text>
      <TextInput
        className={`${className} border-2 ${
          dark ? 'text-gray-300' : 'text-gray-700'
        } rounded-md p-2 mb-4 px-3 h-10 w-full ${getErrorColor('border')}`}
        maxLength={256}
        onChangeText={onChangeText}
        autoCapitalize="none"
        value={value}
      />
      <View className="flex flex-row h-8 w-full mt-[-10px]">
        {hasError && (
          <Text className={`${dark ? 'text-red-400' : 'text-red-700'} text-lg`}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
}
