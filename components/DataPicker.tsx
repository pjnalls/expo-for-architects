import { StatusBar } from 'expo-status-bar';
import DatetimePicker from '@react-native-community/datetimepicker';
import { SetStateAction, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedText } from './ThemedText';

export default function DataPicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [, setShow] = useState(false);
  const [, setMode] = useState('date');

  // const onChangeDate = (e: any, selectedDate?: Date) => {
  //   if (selectedDate) {
  //     setDate(selectedDate);
  //   }
  //   setShow(true);
  // };
  const onChange = (e: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShow(false);
  };
  const showMode = (modeToshow: SetStateAction<string>) => {
    setShow(true);
    setMode(modeToshow);
  };

  return (
    <View className="flex flex-row items-center justify-between gap-2">
      <ThemedText>Birthdate</ThemedText>
      <TouchableOpacity
        className="flex flex-row items-center justify-between gap-2 my-4 ml-[-10px]"
        onPress={() => {}}
      >
        <DatetimePicker
          className="w-full relative z-20"
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display={'default'}
          onChange={onChange}
          style={{
            zIndex: 1000,
            position: 'relative',
          }}
        />
        <StatusBar style="auto" />
        <IconSymbol name="calendar" color="#888" size={36} />
      </TouchableOpacity>
    </View>
  );
}
