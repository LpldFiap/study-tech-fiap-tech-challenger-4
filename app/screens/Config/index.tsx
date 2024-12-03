import { getUser, updateUser } from '@/services/user.service';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import BackButton from '@/components/BackButton';

export default function Config() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    // Fetch user data on mount
    const fetchUserData = async () => {
      const user = await getUser();
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }
    };
    fetchUserData();
  }, []);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleSubmit = async () => {
    if (!name || !email || !newPassword || !confirmNewPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    setIsLoading(true);
    try {
      const user = await getUser();
      if (user) {
        if (user._id) {
          await updateUser({
            id: user._id,
            userData: { name, email, password: newPassword, role: user.role },
          });
        } else {
          throw new Error('User ID is undefined');
        }
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      }
    } catch (err) {
      console.error('Erro ao atualizar perfil', err);
      Alert.alert('Erro', 'Erro ao atualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <BackButton/>
      <Text style={styles.title}>Configuração de Perfil</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Digite seu nome"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          placeholder="Digite a nova senha"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirme a Nova Senha</Text>
        <TextInput
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          style={styles.input}
          placeholder="Confirme a nova senha"
          secureTextEntry
        />
      </View>
      <Button title="Atualizar Perfil" onPress={handleSubmit} color="#1E90FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
