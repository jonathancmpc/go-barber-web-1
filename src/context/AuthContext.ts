import { createContext } from 'react';

// A interface neste caso será tudo que iremos guardar na nossa variável authContext.
interface AuthContextData {
  name: string;
}

// As informações que iremos passar de Contexto tem o objetivo de ficar disponível para ser acessada em qualquer página
// Como o usuário pode não estar logado quando acessar a página, então temos que passar um objeto vazio para o createContext, então passamos o objeto vazio e informamos o tipo dele.(isso é um rackzinho para não termos o erro do typescript nos obrigando a passar os tipos da interface)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
