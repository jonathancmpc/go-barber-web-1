import React from 'react';
/* O useTransition nos permite controlar a animação de um elemento quando ele entra(criado) e sai(removido) da tela */
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../context/ToastContext';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  /* A animação de transição recebe 3 parâmetros: itens, uma função passando a informação única dos itens e um objeto com as animações */
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      /* Onde o objeto vai começar */
      from: { right: '-120%', opacity: 0 },
      /* Posição do right quando o elemento entra em tela */
      enter: { right: '0%', opacity: 1 },
      /* Onde o elemento tem que estar quando sair da tela */
      leave: { right: '-120%', opacity: 0 },
    },
  );

  return (
    <Container>
      {/* Substituímos a messages pela variável da animação e extraímos os parâmetros dela. Props são as propriedades da animação que foi passado na useTransition(from, enter e leave) */}
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
