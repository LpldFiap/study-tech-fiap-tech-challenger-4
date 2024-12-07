import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '@/styles/colors';
import BackButton from '@/components/BackButton';
import { AuthContext } from '@/context/auth';
import { AuthContextType } from '@/types/user';
import { TPost } from '@/types/posts';
import { createPost } from '@/services/post.services';

const RegisterPostScreen = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [created_at] = useState(new Date().toISOString());

  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    if (authenticatedUser?.name) {
      setAuthor(capitalizeFirstLetter(authenticatedUser.name));
    }
  }, [authenticatedUser]);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
  
    try {
      const newPost: TPost = {
        title,
        description,
        author,
        created_at,
      };
  
      console.log('Payload being sent:', newPost);
      console.log('authenticatedUser:', JSON.stringify(authenticatedUser));
  
      const response = await createPost({
        post: newPost,
        user_id: authenticatedUser?._id || '',
      });
      console.log(`Register post: response: ${JSON.stringify(response)}`);
      
      if(response) {
        Alert.alert('Sucesso', 'Publicação criada com sucesso!');
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Erro', 'Falha ao criar a publicação. Tente novamente mais tarde.');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <BackButton />
      <Text style={styles.header}>Cadastrar Publicação</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite a descrição"
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data de Criação</Text>
        <TextInput
          style={styles.input}
          value={new Date(created_at).toLocaleString()}
          editable={false}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={author}
          editable={false}
        />
      </View>

      <Button
        title="Criar Nova Publicação"
        color={colors.green[600]}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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

export default RegisterPostScreen;
