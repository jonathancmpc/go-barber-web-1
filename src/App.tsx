import React from 'react';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './context';

const App: React.FC = () => (
  <>
    {/* Nós passamos o Provider por volta de todas as páginas ou componentes que terão acesso as informações que estamos passando em AuthContext e ToastContext, por exemplo o nome de usuário, token, etc . E então passamos em value quais as informações que queremos passar para esse Contexto */}
    <AppProvider>
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
