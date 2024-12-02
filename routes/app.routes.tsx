import React, { Suspense } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from "react-native";
import AuthUserProvider from "@/context/auth";
import { PostsProvider } from "@/context/Posts/PostsContext";
import { UsersProvider } from "@/context/Users/UsersContext";
import { PrivateRoute } from "@/components/shared/PrivateRoute";
import Header from "@/components/shared/Header";
import RegisterPostScreen from '../app/screens/RegisterPost'; 
import EditPostScreen from '../app/screens/EditPostScreen'; 
// Removendo o lazy loading e importando as telas diretamente
import Home from "../app/screens/Home/index";
import Login from "../app/screens/Login/index";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </Suspense>
        </UsersProvider>
      </PostsProvider>
    </AuthUserProvider>
  );
}
