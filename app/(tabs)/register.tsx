import { ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@react-navigation/native';
import ThemedButton from '@/components/ThemedButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import CatBreeds from '@/components/feat/CatBreeds';
import DataPicker from '@/components/DataPicker';

import { addCat, getCats } from '@/api/fetches/Cat';
import { Cat } from '@/types/Cat';

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

type InputField = {
  label: 'Last Name' | 'First Name' | 'Email' | 'Phone Number' | 'Password';
  value: string;
  errorMessage: string;
  isValid: boolean;
  rule: RegExp;
  onChangeText: (text: string) => void;
  setInputFields?: React.Dispatch<React.SetStateAction<InputField[]>>;
};

export default function RegisterationScreen() {
  // const item = useLocalSearchParams();
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
  const [hasError, setHasError] = useState(true);

  const handleButtonDisabled = (fields: InputField[]) => {
    fields.filter((field) => field.isValid).length >= fields.length
      ? setHasError(false)
      : setHasError(true);
  };

  const handleFirstNameChange = (text: string) => {
    setInputFields((fields) => {
      const f = fields.map((field) => ({
        ...field,
        value: field.label === 'First Name' ? text : field.value,
        isValid:
          field.label === 'First Name' ? field.rule.test(text) : field.isValid,
      }));
      handleButtonDisabled(f);
      return f;
    });
  };

  const handleLastNameChange = (text: string) => {
    setInputFields((fields) => {
      const f = fields.map((field) => ({
        ...field,
        value: field.label === 'Last Name' ? text : field.value,
        isValid:
          field.label === 'Last Name' ? field.rule.test(text) : field.isValid,
      }));
      handleButtonDisabled(f);
      return f;
    });
  };

  const handleEmailChange = (text: string) => {
    setInputFields((fields) => {
      const f = fields.map((field) => ({
        ...field,
        value: field.label === 'Email' ? text : field.value,
        isValid:
          field.label === 'Email' ? field.rule.test(text) : field.isValid,
      }));
      handleButtonDisabled(f);
      return f;
    });
  };

  const [inputFields, setInputFields] = useState<InputField[]>([
    {
      label: 'First Name',
      value: '',
      errorMessage: 'Invalid first name',
      isValid: false,
      rule: /^[a-zA-Z]{1}[a-zA-Z ]*$/,
      onChangeText: handleFirstNameChange,
    },
    {
      label: 'Last Name',
      value: '',
      errorMessage: 'Invalid last name',
      isValid: false,
      rule: /^[a-zA-Z]{1}[a-zA-Z ]*$/,
      onChangeText: handleLastNameChange,
    },
    {
      label: 'Email',
      value: '',
      errorMessage: 'Invalid email',
      isValid: false,
      rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      onChangeText: handleEmailChange,
    },
  ]);

  useEffect(() => {
    setInputFields((fields) =>
      fields.map((field) => ({
        ...field,
        setInputFields,
      }))
    );
  }, []);

  const renderRegisterCat = () => {
    switch (registerationStep) {
      case 'enter_info':
        return (
          <View className="flex flex-col items-center justify-center gap-2 w-full">
            <ThemedText type="subtitle" className="text-center">
              Enter Info
            </ThemedText>
            <ScrollView
              className={`w-full h-1/2 my-4 border-[1px] ${
                dark
                  ? 'bg-zinc-800 border-gray-600'
                  : 'bg-zinc-100 border-gray-400'
              } rounded-lg p-4`}
            >
              <View className="w-full">
                {inputFields.map((input, index) => (
                  <ThemedTextInput
                    key={`Enter-${input.label}-${index}`}
                    {...input}
                  />
                ))}
                <CatBreeds />
                <DataPicker />
              </View>
            </ScrollView>
            <View className="flex flex-row justify-end w-full">
              <ThemedButton
                className="w-1/4"
                title="Next"
                disabled={hasError}
                onPress={() => handleRegisterationStep('review_and_confirm')}
              />
            </View>
          </View>
        );
      case 'review_and_confirm':
        return (
          <View className="flex flex-col items-center justify-center gap-2 w-full">
            <ThemedText type="subtitle">Review and Confirm</ThemedText>
            <ScrollView
              className={`w-full h-1/2 my-4 border-[1px] ${
                dark
                  ? 'bg-zinc-800 border-gray-600'
                  : 'bg-zing-200 border-gray-600'
              } rounded-lg p-4`}
            >
              <View className="w-full">
                {inputFields.map((input, index) => (
                  <View
                    key={`Review-${input.label}-${index}`}
                    className="flex flex-row justify-between"
                  >
                    <ThemedText type="default">{input.label}</ThemedText>
                    <ThemedText type="default">{input.value}</ThemedText>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className="flex flex-row justify-between w-full">
              <ThemedButton
                className="w-1/4"
                title="Back"
                onPress={() => handleRegisterationStep('enter_info')}
              />
              <ThemedButton
                className="w-1/4"
                title="Confirm"
                onPress={async () => {
                  const data: Cat = {
                    firstName:
                      inputFields.find((field) => field.label === 'First Name')
                        ?.value ?? '',
                    lastName:
                      inputFields.find((field) => field.label === 'Last Name')
                        ?.value ?? '',
                    email:
                      inputFields.find((field) => field.label === 'Email')
                        ?.value ?? '',
                  };
                  await addCat(data);
                  handleRegisterationStep('success');
                }}
              />
            </View>
          </View>
        );
      case 'success':
        return (
          <View className="flex flex-col items-center justify-center gap-2 w-full">
            <ThemedText type="subtitle" className="text-center">
              Success
            </ThemedText>
            <View
              className={`w-full h-1/2 my-4 p-4 border-[1px] border-transparent`}
            >
              <ThemedText type="default" className="text-center">
                A new cat has been added successfully!
              </ThemedText>
            </View>
            <View className="flex flex-row justify-center w-full">
              <ThemedButton
                title="Add Another Cat"
                onPress={() => {
                  setInputFields((fields) =>
                    fields.map((field) => ({
                      ...field,
                      value: '',
                    }))
                  );
                  handleRegisterationStep('enter_info');
                }}
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
        } h-4 z-10 relative bottom-[12px] mb-4`}
      ></View>
      {renderRegisterCat()}
    </ThemedView>
  );
}
