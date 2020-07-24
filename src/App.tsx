import React from 'react';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    {/* Nós passamos o AuthContext.Provider por volta de todas as páginas ou componentes que terão acesso as informações que estamos passando em AuthContext, por exemplo o nome de usuário, token, etc . E então passamos em value quais as informações que queremos passar para esse Contexto */}
    <AuthContext.Provider value={{ name: 'Jonathan' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
