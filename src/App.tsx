import React from 'react';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    {/* Nós passamos o Provider por volta de todas as páginas ou componentes que terão acesso as informações que estamos passando em AuthContext, por exemplo o nome de usuário, token, etc . E então passamos em value quais as informações que queremos passar para esse Contexto */}
    <AuthProvider>
      <SignIn />
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
