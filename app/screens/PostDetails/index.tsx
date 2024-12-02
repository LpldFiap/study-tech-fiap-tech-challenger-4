import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/colors';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '@/app/navigation/navigation';

// Tipagem das props de navegação e rota
type PostDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetails'>;
type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

interface PostDetailsProps {
  route: PostDetailsScreenRouteProp;
  navigation: PostDetailsScreenNavigationProp;
}

// Componente tipado diretamente, sem o React.FC
const PostDetails = ({ route, navigation }: PostDetailsProps) => {
  const { post } = route.params;

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Detalhes do post */}
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por: {post.author}</Text>
      <Text style={styles.content}>{post.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: 75, 
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  backButtonText: { fontSize: 16, color: colors.zinc[500], fontWeight: 'bold' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  author: { fontSize: 14, color: '#555', marginBottom: 16 },
  content: { fontSize: 16, lineHeight: 24 },
});

export default PostDetails;
