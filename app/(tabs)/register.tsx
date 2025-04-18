import { TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCatFact } from '@/contexts/CatFactContext';
import { useTheme } from '@react-navigation/native';
import ThemedButton from '@/components/ThemedButton';

type RegisterationStep =
  | 'enter_info'
  | 'review_and_confirm'
  | 'success'
  | 'error'
  | 'loading';

type RegisterationStepNode = {
  step: RegisterationStep;
  enabled: boolean;
};

export default function RegisterationScreen() {
  // const item = useLocalSearchParams();
  const { catFact } = useCatFact();
  const { dark } = useTheme();
  const [registerationStep, setRegisterationStep] =
    useState<RegisterationStep>('enter_info');
  const [registerationStepNodes, setRegisterationStepNodes] = useState<
    RegisterationStepNode[]
  >([
    { step: 'enter_info', enabled: true },
    { step: 'review_and_confirm', enabled: false },
    { step: 'success', enabled: false },
  ]);

  const addCat = () => {
    switch (registerationStep) {
      case 'enter_info':
        return (
          <View className="flex flex-col items-center justify-center gap-2 w-full">
            <ThemedText type="subtitle">Enter Info</ThemedText>
            <View className="flex flex-row justify-end w-full">
              <ThemedButton
                className="w-1/4"
                title="Next"
                onPress={() => handleRegisterationStep('review_and_confirm')}
              />
            </View>
          </View>
        );
      case 'review_and_confirm':
        return (
          <View className="flex flex-col items-center justify-center gap-2 w-full">
            <ThemedText type="subtitle">Review and Confirm</ThemedText>
            <View className="flex flex-row justify-between w-full">
              <ThemedButton
                className="w-1/4"
                title="Back"
                onPress={() => handleRegisterationStep('enter_info')}
              />
              <ThemedButton
                className="w-1/4"
                title="Confirm"
                onPress={() => handleRegisterationStep('success')}
              />
            </View>
          </View>
        );
      case 'success':
        return (
          <View className="flex flex-col items-center justify-center gap-2 w-full">
            <ThemedText type="subtitle">Success</ThemedText>
            <View className="flex flex-row justify-center w-full">
              <ThemedButton
                title="Add Another Cat"
                onPress={() => handleRegisterationStep('enter_info')}
              />
            </View>
          </View>
        );
      case 'error':
        return <ThemedText type="subtitle">Error</ThemedText>;
      case 'loading':
        return <ThemedText type="subtitle">Loading</ThemedText>;
      default:
        return <ThemedText type="subtitle">Unknown</ThemedText>;
    }
  };

  const handleRegisterationStep = (step: RegisterationStep) => {
    setRegisterationStep(step);
    setRegisterationStepNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        enabled: node.step === step || node.enabled,
      }))
    );
    if (step === 'enter_info') {
      setRegisterationStepNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          enabled: node.step === 'enter_info' || false,
        }))
      );
    }
  };

  const calculateProgress = () => {
    if (registerationStep === 'enter_info') {
      return 'w-[0%]';
    } else if (registerationStep === 'review_and_confirm') {
      return 'w-[45%]';
    } else {
      return 'w-[90%]';
    }
  };

  const RegisterationNode = ({ enabled }: { enabled: boolean }) => {
    return (
      <View>
        <View
          className={`w-10 h-10 ${
            enabled ? 'bg-green-500' : 'bg-transparent'
          } rounded-full relative top-[62px] z-50`}
        ></View>
        <View
          className={`w-11 h-11 ${
            dark ? 'bg-green-200' : 'bg-green-800'
          } rounded-full relative top-[25px] right-[2px] z-10`}
        ></View>
      </View>
    );
  };

  return (
    <ThemedView className="flex flex-1 justify-center p-8">
      <ThemedText type="title" className="text-center">
        Register
      </ThemedText>
      <View className="flex flex-row items-center justify-between w-full relative z-50">
        {registerationStepNodes.map((node, index) => (
          <RegisterationNode
            key={`${node.step}-${index}`}
            enabled={node.enabled}
          />
        ))}
      </View>
      <View className={`${calculateProgress()} bg-green-500 h-3 z-50`}></View>
      <View
        className={`w-[90%] ${
          dark ? 'bg-green-200' : 'bg-green-800'
        } h-4 z-10 relative bottom-[12px]`}
      ></View>
      {addCat()}
    </ThemedView>
  );
}
