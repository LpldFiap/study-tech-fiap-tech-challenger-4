import { AuthContext } from "@/context/auth";
import { newUser } from "@/services/newUser";
import { AuthContextType } from "@/types/user";
import { saveUser } from "@/utils/auth";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const { authenticateUser } = useContext(AuthContext) as AuthContextType;

  const handleLoginSubmit = async () => {
    setIsLoading(true);
    const isUserAuthenticated = await authenticateUser({ email, password });
    if (isUserAuthenticated?.name) {
      navigation.navigate('Home', {email});
    } else {
      setErrorMessage("Credenciais incorretas");
    }
    setIsLoading(false);
    setTimeout(() => formReset(), 3000);
  };

  const handleRegisterSubmit = async () => {
    if (registerPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }
    setIsLoading(true);

    try {
      const response = await newUser({
        email: registerEmail,
        name: name,
        password: registerPassword,
        role: "student",
      });
      if (response) {
        saveUser({
          name: response.Name,
          email: response.Email,
          role: response.Role,
          _id: "0",
        });
        setIsModalOpen(false);
        navigation.navigate("Home");
        formReset();
      } else {
        console.error("Erro ao cadastrar usuário");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formReset = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#274F32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem vindo de volta!</Text>
        <Text style={styles.subtitle}>
          Preparado para escrever algo incrível?
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entre com seus dados</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setIsModalOpen(true)}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalOpen} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Cadastro</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={registerEmail}
                onChangeText={setRegisterEmail}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                value={registerPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirme a Senha</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={handleRegisterSubmit}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16, backgroundColor: "#45B649" },
  header: { marginBottom: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#DCE35B", textAlign: "center" },
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 10, shadowColor: "#000", elevation: 5 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: "#7C7C7C" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, fontSize: 16 },
  button: { backgroundColor: "#274F32", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  secondaryButton: { backgroundColor: "#fff", borderColor: "#274F32", borderWidth: 1 },
  secondaryButtonText: { color: "#274F32" },
  error: { color: "red", fontSize: 12 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalBackground: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },
  modal: { width: "90%", padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
});
