import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/styles/colors';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/navigation';

type PostDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PostDetails'>;
type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

interface PostDetailsProps {
  route: PostDetailsScreenRouteProp;
  navigation: PostDetailsScreenNavigationProp;
}

const PostDetails = ({ route, navigation }: PostDetailsProps) => {
  const { post } = route.params;

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
    width: 75,
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
    backgroundColor: colors.zinc[300],
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
});

export default PostDetails;
