import styled from 'styled-components';

export const Container = styled.div`
  position: relative; /* Passando esse position relative, nós estamos informando que todo position absolute que está dentro do container obedexerá a posição relativa do container, e não da tela toda */

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden; /* Esconde o elemento enquanto não estiver disponível para ser visto*/

    position: absolute;
    bottom: calc(
      100% + 12px
    ); /* Com o bottom 100% ele fica na mesma linha do topo do ícone */
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    /* Flecha do balão */
    &::before {
      content: ''; /* Para ser exibido em tela de conter o content mesmo sendo vazio */
      border-style: solid;
      border-color: #ff9000 transparent;
      /* Fazendo um triangulo com a borda */
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
