import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native'; // Importa o tipo RouteProp
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/styles/colors';

// Define os tipos para as rotas
type RootStackParamList = {
  EditPostScreen: { post: { title: string; content: string; creatorName: string; creationDate: string } };
};

// Define os tipos do route e navigation
type EditPostRouteProp = RouteProp<RootStackParamList, 'EditPostScreen'>;

type Props = {
  route: EditPostRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'EditPostScreen'>;
};

const EditPostScreen: React.FC<Props> = ({ route, navigation }) => {
  const { post } = route.params; // Recebe o post como parâmetro

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [creatorName] = useState(post?.creatorName || '');
  const [creationDate] = useState(post?.creationDate || '');

  const handleSave = () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    Alert.alert('Sucesso', 'Publicação atualizada com sucesso!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Editar Publicação</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o Título"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite o conteúdo"
          multiline
          numberOfLines={6}
          value={content}
          onChangeText={setContent}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data de Criação</Text>
        <TextInput
          style={styles.input}
          value={creationDate}
          editable={false}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={creatorName}
          editable={false}
        />
      </View>

      <Button title="Salvar Alterações" color={colors.green[600]} onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.zinc[100],
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: colors.zinc[400],
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100, 
    textAlignVertical: 'top',
  },
});

export default EditPostScreen;
