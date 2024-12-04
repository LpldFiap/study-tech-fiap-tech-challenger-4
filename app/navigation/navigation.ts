import { TPost } from '../../types/posts'; // Certifique-se de ter esse tipo exportado corretamente

export type RootStackParamList = {
  Home: undefined; // Tela Home não tem parâmetros
  Login: undefined;
  PostDetails: { post: TPost }; // Tela PostDetails recebe um parâmetro "post",
  Config: undefined; // Adicione essa rota
  TeacherAdmin: undefined;
  StudentAdmin: undefined;
  RegisterPost: undefined;
  EditPost: undefined;
  EditUser: undefined;
  Admin: undefined;
};
