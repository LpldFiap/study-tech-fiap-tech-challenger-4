import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '@/styles/colors';
import BackButton from '@/components/BackButton';
import { AuthContext } from '@/context/auth';
import { AuthContextType } from '@/types/user';

const RegisterPostScreen = () => {
  // Estados do formulário
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');  
  const [creationDate] = useState(new Date().toLocaleString());  

  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;

  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (authenticatedUser?.name) {
      setAuthor(capitalizeFirstLetter(authenticatedUser.name));
    }
  }, [authenticatedUser]);

  const handleSubmit = () => {
    if (!title || !content) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    Alert.alert('Sucesso', 'Publicação Criado!');
    setTitle('');
    setContent('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cadastrar Publicação</Text>
      <BackButton />
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
          value={author}
          editable={false}
        />
      </View>

      <Button title="Criar Nova Publicação" color= {colors.green[600]} onPress={handleSubmit} />
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
    height: 100,  // Dá altura extra ao campo de conteúdo
    textAlignVertical: 'top',  // Para que o texto comece no topo
  },
});

export default RegisterPostScreen;
