import React, { useState, useContext } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/navigation";
import { colors } from "@/styles/colors";
import { AuthContext } from "../context/auth";
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface SideBarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => Promise<void>;
  authenticatedUser?: { name: string; role: string } | null;
}

const SideBar: React.FC<SideBarProps> = ({
  isOpen,
  onToggle,
  onLogout,
  authenticatedUser,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const sidebarAnimation = useState(new Animated.Value(-200))[0];
  const authContext = useContext(AuthContext);
  React.useEffect(() => {
    const toValue = isOpen ? 0 : -200;
    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  }, [isOpen]);

  const handleRedirectConfig = () => {
    navigation.navigate("Config");
  };

  const handleRedirectAdmin = () => {
    navigation.navigate("Admin");
  };
  const handleLogout = async () => {
    if (authContext?.logoutUser) {
      await authContext.logoutUser("Login");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };
  return (
    <Animated.View
      style={[
        styles.sidebar,
        { transform: [{ translateX: sidebarAnimation }] },
      ]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={onToggle}>
        <Text style={styles.closeButtonText}>x</Text>
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
              onPress={handleRedirectAdmin}
            >
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export default SideBar;
