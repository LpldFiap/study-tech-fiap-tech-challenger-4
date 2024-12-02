import React, { Suspense } from "react"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import AuthUserProvider from "@/context/auth";
import { PostsProvider } from "@/context/Posts/PostsContext";
import { UsersProvider } from "@/context/Users/UsersContext";
import { RootStackParamList } from "@/app/navigation/navigation";  // Verifique se você tem esse arquivo
import RegisterPostScreen from '../app/screens/RegisterPost'; 
import EditPostScreen from '../app/screens/EditPostScreen'; 
import Home from "../app/screens/Home/index";
import Login from "../app/screens/Login/index";
import PostDetails from '../app/screens/PostDetails/index';

// Criação do Stack
const Stack = createNativeStackNavigator<RootStackParamList>();  // Certifique-se de passar o tipo para o Stack.Navigator

function LoadingComponent() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

export default function AppRoutes() {
  return (
    <AuthUserProvider>
      <PostsProvider>
        <UsersProvider>
          <Suspense fallback={<LoadingComponent />}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
              {/* Certifique-se de tipar corretamente o componente de PostDetails */}
              <Stack.Screen name="PostDetails" component={PostDetails} />
            </Stack.Navigator>
          </Suspense>
        </UsersProvider>
      </PostsProvider>
    </AuthUserProvider>
  );
}
