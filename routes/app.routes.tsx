import React, { Suspense } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import AuthUserProvider from "@/context/auth";
import { PostsProvider } from "@/context/Posts/PostsContext";
import { UsersProvider } from "@/context/Users/UsersContext";
// Removendo o lazy loading e importando as telas diretamente
import Home from "../app/screens/Home/index";
import Login from "../app/screens/Login/index";
import CadastroProfessor from "@/app/screens/CadastroProfessor";

const Stack = createNativeStackNavigator();

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
              <Stack.Screen name="CadastroProfessor" component={CadastroProfessor} />
            </Stack.Navigator>
          </Suspense>
        </UsersProvider>
      </PostsProvider>
    </AuthUserProvider>
  );
}
