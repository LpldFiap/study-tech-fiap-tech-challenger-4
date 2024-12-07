import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/styles/colors';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/navigation';
import { AuthContext } from '@/context/auth';
import { AuthContextType } from '@/types/user';
import { deletePost } from '@/services/post.services';

type PostDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetails'>;
type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

interface PostDetailsProps {
  route: PostDetailsScreenRouteProp;
  navigation: PostDetailsScreenNavigationProp;
}

const PostDetails = ({ route, navigation }: PostDetailsProps) => {
  const { post } = route.params;
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;

  const handleDelete = async () => {
    try {
      if (!post._id || !authenticatedUser?._id) {
        Alert.alert('Erro', 'Informações insuficientes para deletar o post.');
        return;
      }

      await deletePost({ id: post._id, user_id: authenticatedUser._id });
      Alert.alert('Sucesso', 'Publicação deletada com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao deletar publicação:', error);
      Alert.alert('Erro', 'Não foi possível deletar a publicação.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título do post */}
      <Text style={styles.title}>{post.title}</Text>

      {/* Detalhes do post */}
      <View style={styles.ContainerContent}>
        <Text style={styles.author}>Por: {post.author}</Text>
        <Text style={styles.content}>{post.description}</Text>
      </View>

      {authenticatedUser?.role === 'teacher' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditPostScreen', { post })}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: colors.zinc[200],
  },
  backButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 30,
    width: 75,
    backgroundColor: colors.zinc[100],
  },
  backButtonText: {
    fontSize: 16,
    color: colors.green[600],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    alignSelf: 'center',
  },
  ContainerContent: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.zinc[200],
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  author: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.green[600],
    backgroundColor: colors.zinc[100],
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: colors.zinc[800],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: colors.red[100],
    alignSelf: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PostDetails;
