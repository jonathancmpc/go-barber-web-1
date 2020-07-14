import styled from 'styled-components';
import { shade } from 'polished';
import signBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch; /* Faz com que os itens tenham o mesmo tamanho do pai, esticando o máximo que puder, que é essa div */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    input {
      background: #232129;
      color: #f4ede8;
      border-radius: 10px;
      border: 2px solid #232129; /* Inserida pois iremos utilizar a borda para informar um erro, transformando ela em outra cor */
      padding: 16px;
      width: 100%;

      & + input {
        margin-top: 8px;
      }
    }

    button {
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0; /* Inserida pois iremos utilizar a borda para informar um erro, transformando ela em outra cor */
      padding: 0 16px;
      color: #312e38;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#ff9000')}; /* Escurece 20% da cor. */
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')};
      }
    }
  }

  /* Para não interferir no link(a) de dentro do form, colocamos o sinal > que informa ao css que é somente para pegar o a que estiver diretamente ligado ao pai, ou seja, ao Content */
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1; /* Faz com que ele ocupe todo o espaço restante da div, ou seja é o espaço - 700px da div Content */
  background: url(${signBackgroundImg}) no-repeat center;
  background-size: cover; /* Faz com que a imagem expanda em toda a div */
`;
