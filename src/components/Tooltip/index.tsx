import React from 'react';

import { Container } from './styles';

/* Criando uma interface para dizer quais as propriedades que esse tooltip vai receber. Lembrando que o className só está sendo passado pq estamos fazendo a estilização do erro dentro do styles do input */
interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
