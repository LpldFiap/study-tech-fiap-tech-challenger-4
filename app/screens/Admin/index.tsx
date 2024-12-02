import { useUsers } from "@/context/Users/UsersContext";
import { deleteUser, getUserId, getUserRole, updateUser } from "@/services/user.service";
import { TUserRole } from "@/types/user";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

export default function Admin() {
  const [role, setRole] = useState<TUserRole | null>(null);
  const { users, loading, fetchUsers } = useUsers();

  const changeUserRole = async ({ id, newRole }: { id?: string; newRole: TUserRole }) => {
    if (!id) return;
    const userData = users.find((user) => user._id === id);
    if (!userData) return;
    userData.role = newRole;
    try {
      await updateUser({ id, userData });
    } catch (error) {
      console.error("Erro ao alterar o perfil do usuário:", error);
    } finally {
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id?: string) => {
    if (!id) return;
    try {
      const user_id = await getUserId();
      await deleteUser({ id, user_id });
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    } finally {
      fetchUsers();
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getUserRole();
      if (userRole) {
        setRole(userRole);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (role !== "teacher") {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.accessDeniedText}>
          Acesso negado. Apenas professores podem acessar esta página.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderUser = ({ item }: { item: any }) => (
    <View style={styles.userRow}>
      <Text style={styles.userInfo}>{item.name}</Text>
      <Text style={styles.userInfo}>{item.email}</Text>
      <Text style={styles.userInfo}>{item.role}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => changeUserRole({ id: item._id, newRole: "teacher" })}
          style={[
            styles.actionButton,
            styles.teacherButton,
            item.role === "teacher" && styles.disabledButton,
          ]}
          disabled={item.role === "teacher"}
        >
          <Text style={styles.buttonText}>Tornar Professor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeUserRole({ id: item._id, newRole: "student" })}
          style={[
            styles.actionButton,
            styles.studentButton,
            item.role === "student" && styles.disabledButton,
          ]}
          disabled={item.role === "student"}
        >
          <Text style={styles.buttonText}>Tornar Aluno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Confirmação", "Deseja realmente deletar este usuário?", [
              { text: "Cancelar", style: "cancel" },
              { text: "Deletar", onPress: () => handleDeleteUser(item._id) },
            ])
          }
          style={[styles.actionButton, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Administração de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id ?? item.email}
        renderItem={renderUser}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  accessDeniedText: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  userRow: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    elevation: 1,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 4,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  teacherButton: {
    backgroundColor: "#1E90FF",
  },
  studentButton: {
    backgroundColor: "#32CD32",
  },
  deleteButton: {
    backgroundColor: "#FF4500",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
