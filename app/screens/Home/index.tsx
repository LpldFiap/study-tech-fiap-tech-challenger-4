import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { AuthContext } from "@/context/auth";
import { usePosts } from "@/context/Posts/PostsContext";
import { AuthContextType } from "@/types/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/navigation";
import { colors } from "@/styles/colors";

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  description: string;
}

export default function Home() {
  const { authenticatedUser, logoutUser } = useContext(
    AuthContext
  ) as AuthContextType;
  const { posts, loading } = usePosts();
  const navigation = useNavigation<HomeNavigationProp>();

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnimation = useState(new Animated.Value(-200))[0]; // Posição inicial da sidebar (fora da tela)

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? -200 : 0; // Mostrar ou esconder
    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start(() => setSidebarOpen(!isSidebarOpen));
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const handleRedirectConfig = () => {
    navigation.navigate("Config");
  };

  const handleRedirectAdmin = () => {
    navigation.navigate("Admin");
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnimation }] },
        ]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
        <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Lohout</Text>
          </TouchableOpacity>

          {authenticatedUser?.role === "teacher" && (
            <>
              <TouchableOpacity
                style={styles.configButton}
                onPress={handleRedirectConfig}
              >
                <Text style={styles.buttonText}>Config</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.adminButton}
                onPress={handleRedirectAdmin}
              >
                <Text style={styles.buttonText}>Admin</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Text style={styles.menuButtonText}>≡</Text>
        </TouchableOpacity>
        <View style={styles.infoField}>
          <Text style={styles.infoText}>
            {authenticatedUser
              ? `Bom te ver, ${authenticatedUser.name}!`
              : "Bem-vindo!"}
          </Text>
          <Text style={styles.headerText}>Publicações</Text>
        </View>

        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id || Math.random().toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.postItem}
                onPress={() =>
                  navigation.navigate("PostDetails", { post: item })
                }
              >
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>
                  {item.description.slice(0, 100)}...
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.postsList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    backgroundColor: colors.green[700],
    zIndex: 2,
    padding: 10,
    justifyContent: "flex-start", // Alinhar elementos ao topo
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
    borderRadius: 4,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "white",
  },
  buttonGroup: {
    marginTop: 20,
    alignItems: "center", // Centralizar horizontalmente
  },
  logoutButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%", // Deixar largura consistente
    alignItems: "center", // Centralizar o texto
  },
  configButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  adminButton: {
    // backgroundColor: colors.zinc[400],
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  adminButtons: {
    alignSelf: "flex-start",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.zinc[200],
  },
  menuButton: {
    backgroundColor: colors.green[700],
    padding: 8,
    borderRadius: 2,
    alignSelf: "flex-start",
  },
  menuButtonText: {
    fontSize: 24,
    color: "white",
  },
  infoField: {
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: { fontSize: 18, fontWeight: "bold" },
  headerText: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  postsList: { marginTop: 16 },
  postItem: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.zinc[100],
  },
  postTitle: { fontSize: 16, fontWeight: "bold" },
  postContent: { fontSize: 14, color: colors.zinc[500], marginTop: 5 },
});
