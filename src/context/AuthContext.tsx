import React, { createContext, useCallback } from 'react';
import api from '../services/api';

// Interface montada para falar ao nosso método signIn os tipos do email e da senha.
interface SignInCredentials {
  email: string;
  password: string;
}

// A interface neste caso será tudo que iremos guardar na nossa variável authContext.
interface AuthContextData {
  name: string;
  signIn(credentialsUsers: SignInCredentials): Promise<void>;
}

// As informações que iremos passar de Contexto tem o objetivo de ficar disponível para ser acessada em qualquer página
// Como o usuário pode não estar logado quando acessar a página, então temos que passar um objeto vazio para o createContext, então passamos o objeto vazio e informamos o tipo dele.(isso é um rackzinho para não termos o erro do typescript nos obrigando a passar os tipos da interface)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // Buscando informações do usuário na API. Deve-se passar o email e a senha para autenticação na nossa API, irá retornar os dados do usuário. Esses dados vem do componente SignIn.
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    // Vai retornar os dados do usuário
    console.log(response.data);
  }, []);

  // Retorna um módulo com as informações do usuário através do contexto. Repassamos o método signIn com as informações do usuário
  return (
    <>
      <AuthContext.Provider value={{ name: 'Jonathan', signIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };
