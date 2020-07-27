import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './context';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    {/* Nós passamos o Provider por volta de todas as páginas ou componentes que terão acesso as informações que estamos passando em AuthContext e ToastContext, por exemplo o nome de usuário, token, etc . E então passamos em value quais as informações que queremos passar para esse Contexto */}
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
