/* eslint-disable no-console */
import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
// import api from '../services/api';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  /* Como podemos armazernar várias mensagens de Toast ao mesmo tempo, temos que começar com um array vazio */
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid(); // Criando um id único para nossa mensagem de toast com uuidv4

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages([...messages, toast]);
    },
    [messages],
  );

  const removeToast = useCallback((id: string) => {
    /* Retorna todas as mensagens que estão dentro do estado atual, menos aquela que foi passado o id */
    setMessages(oldmessage => oldmessage.filter(message => message.id !== id));
  }, []);

  // Retorna um módulo com as informações do usuário através do contexto. Repassamos o método signIn com as informações do usuário
  return (
    <>
      <ToastContext.Provider value={{ addToast, removeToast }}>
        {children}

        <ToastContainer messages={messages} />
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
