import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateUser } from "@/services/user.service";

export default function EditUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user }: any = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const saveUserDetails = async () => {
    if (!name || !email) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    if (newPassword && newPassword !== confirmNewPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    const updatedUser = { ...user, name, email, ...(newPassword ? { password: newPassword } : {}) };

    try {
      await updateUser({ id: user._id, userData: updatedUser });
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Digite o nome do usuário"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Digite o email do usuário"
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

      <View style={styles.buttonContainer}>
        <Button title="Salvar" onPress={saveUserDetails} color="#1E90FF" />
        <View style={styles.cancelButton}>
          <Button title="Cancelar" onPress={() => navigation.goBack()} color="#FF6347" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
});
