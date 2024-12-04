import React, { Suspense } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import AuthUserProvider from "@/context/auth";
import { PostsProvider } from "@/context/Posts/PostsContext";
import { UsersProvider } from "@/context/Users/UsersContext";
import Home from "@/app/screens/Home/index";
import Login from "@/app/screens/Login/index";
import Config from "@/app/screens/Config";
import PostDetails from "@/app/screens/PostDetails/index";
import RegisterPostScreen from "@/app/screens/RegisterPost";
import EditPostScreen from "@/app/screens/EditPostScreen";
import { RootStackParamList } from "@/app/navigation/navigation";
import TeacherAdmin from "@/app/screens/TeacherAdmin";
import EditUser from "@/app/screens/EditUser";
import StudentAdmin from "@/app/screens/StudentAdmin";

// Criação do Stack com tipagem do parâmetro RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

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
              <Stack.Screen name="Config" component={Config} />
              <Stack.Screen name="TeacherAdmin" component={TeacherAdmin} />
              <Stack.Screen name="StudentAdmin" component={StudentAdmin} />
              <Stack.Screen name="PostDetails" component={PostDetails} />
              <Stack.Screen name="RegisterPost" component={RegisterPostScreen} />
              <Stack.Screen name="EditUser" component={EditUser} />
              <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
            </Stack.Navigator>
          </Suspense>
        </UsersProvider>
      </PostsProvider>
    </AuthUserProvider>
  );
}
