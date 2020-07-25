import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../context/ToastContext';

// A interface foi criada reaproveitando a interface que está no index do ToastContext
interface ToastProps {
  message: ToastMessage;
}

// Criando um objeto para passar os ícones de acordo com o tipo de alerta.
const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  // Passando um efeito para executar toda vez que o Toast surgir na tela, colocamos então um tempo para ele ficar visível, depois o removemos.
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // Caso o toast seja removido antes dos 3 segundo pelo usuário nós cancelamos o Timer. Então utilizamos a teoria do React, que diz que toda vez que não tiver mais um objeto, uma função é automáticamente executada
    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container type={message.type} hasDescription={!!message.description}>
      {/* Trazendo o ícone de acordo com o tipo, como não é obrigatória, passamos info caso não exista o tipo */}
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
