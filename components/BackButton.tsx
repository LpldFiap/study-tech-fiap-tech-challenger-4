import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/styles/colors';
interface BackButtonProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const BackButton: React.FC<BackButtonProps> = ({ label = "Voltar", style, textStyle}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleGoBack}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 20,
    width: 75,
  },
  text: {
    fontSize: 16,
    color: colors.green[600],
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BackButton;
