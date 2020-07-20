import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  /* Essa função recebe os dados do form(data) */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Logo GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          {/* Enviamos o ícone como propriedade do Input para utilizarmos no componente, lembramos que declaramos o type dele na interface como React.ComponentType, pq ele é um componente do react */}
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="forgot">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
