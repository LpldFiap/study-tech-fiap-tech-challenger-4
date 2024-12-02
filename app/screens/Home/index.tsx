import React, { useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { AuthContext } from '@/context/auth';
import { usePosts } from '@/context/Posts/PostsContext';
import { AuthContextType } from '@/types/user';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/styles/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/navigation';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
  const { authenticatedUser, logoutUser } = useContext(AuthContext) as AuthContextType;
  const { posts, loading } = usePosts();
  const navigation = useNavigation<HomeNavigationProp>();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.infoField}>
        <Text style={styles.infoText}>
          {authenticatedUser
            ? `Bom te ver, ${authenticatedUser.name}!`
            : 'Bem-vindo!'}
        </Text>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Publicações</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id || Math.random().toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.postItem}
              onPress={() => navigation.navigate('PostDetails', { post: item })}
            >
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>
                {item.description.slice(0, 100)}... {/* Mostra apenas o resumo */}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.postsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: { flex: 1, padding: 16 },
  infoField: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  infoText: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: colors.red[100],
    padding: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  postsList: { marginTop: 16 },
  postItem: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.zinc[200],
    borderColor: colors.zinc[900],
  },
  postTitle: { fontSize: 16, fontWeight: 'bold' },
  postContent: { fontSize: 14, color: colors.zinc[500] },
});
