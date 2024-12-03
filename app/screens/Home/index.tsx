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
  const sidebarAnimation = useState(new Animated.Value(-200))[0];

  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? -200 : 0;
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

  const handleRedirectTeacherAdmin = () => {
    navigation.navigate("TeacherAdmin");
  };

  const handleRedirectStudentAdmin = () => {
    navigation.navigate("StudentAdmin");
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
            <Text style={styles.logoutText}>Logout</Text>
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
                onPress={handleRedirectTeacherAdmin}
              >
                <Text style={styles.buttonText}>Gerenciar Professores</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.adminButton}
                onPress={handleRedirectStudentAdmin}
              >
                <Text style={styles.buttonText}>Gerenciar Alunos</Text>
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
              ? `Bom te ver, ${capitalizeFirstLetter(authenticatedUser.name)}!`
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

      {/* Register New Post Button */}
      <TouchableOpacity
        style={styles.RegisterNewPost}
        onPress={() => navigation.navigate("RegisterPost")} // Navegar para a tela de criar novo post
      >
        <Text style={styles.RegisterNewPostText}>+</Text>
      </TouchableOpacity>
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
    backgroundColor: colors.green[100],
    zIndex: 2,
    padding: 10,
    justifyContent: "flex-start",
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
    alignItems: "center",
  },
  logoutButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  configButton: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  adminButton: {
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
    backgroundColor: colors.green[100],
  },
  menuButton: {
    backgroundColor: colors.green[100],
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
  infoText: { fontSize: 18, fontWeight: "bold", color: colors.zinc[100] },
  headerText: {
    fontSize: 16,
    color: colors.zinc[100],
    marginTop: 10,
    alignSelf: "flex-start",
  },
  postsList: { marginTop: 16 },
  postItem: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.zinc[100],
  },
  postTitle: { fontSize: 16, fontWeight: "bold" },
  postContent: { fontSize: 14, color: colors.zinc[500], marginTop: 5 },

  RegisterNewPost: {
    position: "absolute",
    bottom: 20, 
    right: 20, 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: colors.green[300],
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  RegisterNewPostText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});
