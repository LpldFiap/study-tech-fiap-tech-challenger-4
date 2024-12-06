import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@/styles/colors';
import { updatePost } from '@/services/post.services';
import { AuthContext } from '@/context/auth';
import { AuthContextType } from '@/types/user';

// Define the types for routes
type RootStackParamList = {
  EditPostScreen: { post: { title: string; description: string; author: string; created_at: string; _id: string } };
};

// Define the types for route and navigation
type EditPostRouteProp = RouteProp<RootStackParamList, 'EditPostScreen'>;

type Props = {
  route: EditPostRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'EditPostScreen'>;
};

const EditPostScreen: React.FC<Props> = ({ route, navigation }) => {
  const { post } = route.params;
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.description || '');
  const [creatorName] = useState(post?.author || '');
  const [creationDate] = useState(post?.created_at || '');

  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      // Call the updatePost API
      const updatedPost = await updatePost({
        post: {
          _id: post._id,
          title,
          description: content,
          author: creatorName,
        },
        user_id: authenticatedUser?.id || '',
      });

      Alert.alert('Sucesso', 'Publicação atualizada com sucesso!');
      console.log('Updated Post:', updatedPost);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar publicação:', error);
      Alert.alert('Erro', 'Não foi possível atualizar a publicação');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
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
  backButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: 75,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.green[600],
    fontWeight: 'bold',
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
