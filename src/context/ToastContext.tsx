import React, { createContext, useContext, useCallback } from 'react';
import api from '../services/api';

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  // Retorna um módulo com as informações do usuário através do contexto. Repassamos o método signIn com as informações do usuário
  return (
    <>
      <ToastContext.Provider value={{ addToast, removeToast }}>
        {children}

        <ToastContainer />
      </ToastContext.Provider>
    </>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must bu used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
