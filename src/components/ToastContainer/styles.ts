import styled, { css } from 'styled-components';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  /* Pode ou não ter descrição */
  hasDescription: boolean;
}

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden; /* Tudo que for mostrado além do Container é ignorado */
`;

/* Declarando variáveis para usar no toast caso danger, succes e alert */
const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Toast = styled.div<ToastProps>`
  width: 360px;

  position: relative; /* Passado porque teremos um position absolute dentro dele */
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;

  /* Dando espaço entre os toasts */
  & + div {
    margin-top: 8px;
  }

  /* Verifica se existe a propriedade type na tag Toast, caso não exista, passa a cor padrão que é a cor da variável 'info' */
  ${props => toastTypeVariations[props.type || 'info']}

  /* Estilizando o svg que está diretamente ligado a div Toast */
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    strong {
      font-weight: 600;
    }

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  /* Verifica se não tem descrição(hasDescription={false}), e se não tiver fazemos uma estilização diferente */
  ${props =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
