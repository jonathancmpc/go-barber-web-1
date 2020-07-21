import styled, { css } from 'styled-components';
/* Importando o Tooltip para fazermos a estilização em cima do Error, basicamente iremos estilizar o Componente Tooltip que criamos, utilizando o estilo do Error */
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129; /* Inserida pois iremos utilizar a borda para informar um erro, transformando ela em outra cor */
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Acessando as propriedades do componente Container para passarmos o foco. Se for true passamos o css */
  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
      background: transparent;
    `}

  /* Acessando as propriedades do componente Container para deixar o ícone laranja quando estiver preenchido o input*/
  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    /* Tornando o input transparente para parecer que o ícone está dentro do input */
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

/* Estilizando o Componente Tooltip através do Error, isso deve ser eito através de classe, por isso temos que passa o ClasName lá no componente Tooltip. Ele está praticamente herdando a estilização do Tooltip */
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  /* Estilizando o balão do tooltip vindo na herança, nesse caso ele sobreescreve o estilo original do Tooltip */
  span {
    background: #c53030;
    color: #fdfdfd;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
