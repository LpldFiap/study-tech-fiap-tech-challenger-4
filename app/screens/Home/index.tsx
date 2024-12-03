import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { usePosts } from "@/context/Posts/PostsContext";
import { AuthContext } from "@/context/auth";
import { AuthContextType } from "@/types/user";
import { colors } from "@/styles/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/navigation";
import SideBar from "@/components/SideBar";

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function Home() {
  const { authenticatedUser, logoutUser } = useContext(
    AuthContext
  ) as AuthContextType;
  const { posts, loading } = usePosts();
  const navigation = useNavigation<HomeNavigationProp>();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      await logoutUser("Login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };
  function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <SideBar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onLogout={handleLogout}
        authenticatedUser={authenticatedUser}
      />
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Text style={styles.menuButtonText}>≡</Text>
        </TouchableOpacity>
        <View style={styles.infoField}>
          <Text style={styles.infoText}>
            {authenticatedUser
              ?`Bom te ver, ${capitalizeFirstLetter(authenticatedUser.name)}!`
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
  },
  headerText: {
    fontSize: 16,
    color: colors.zinc[100],
    marginTop: 10,
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
  infoText: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "bold"
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold"
  },
  infoField: {
    alignItems: "center",
    marginBottom: 10,
    fontWeight: "bold"
  },
  postsList: { marginTop: 16 },
  postItem: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.zinc[100],
  },
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
