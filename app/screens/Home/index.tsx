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
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const { posts, loading } = usePosts();
  const navigation = useNavigation<HomeNavigationProp>();
  return (
    <View style={styles.homeContainer}>
      <View style={styles.infoField}>
        <Text style={styles.infoText}>
          {authenticatedUser
            ? `Bom te ver, ${authenticatedUser.name}!`
            : 'Bem-vindo!'}
        </Text>
        <View style={[styles.detailsContent]}>
          <Text>Publicações</Text>
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
    marginTop: 10,
  },
  infoText: { fontSize: 16, fontWeight: 'bold', marginTop: 24 },
  detailsContent: {
    fontSize: 14,
    fontWeight: '400', 
    marginTop: 20, 
    padding: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  postsList: { marginTop: 16 },
  postItem: {
    marginBottom: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.zinc[200],
    borderColor: colors.zinc[900]
  },
  postTitle: { fontSize: 16, fontWeight: 'bold' },
  postContent: { fontSize: 14, color: colors.zinc[500] },
});
