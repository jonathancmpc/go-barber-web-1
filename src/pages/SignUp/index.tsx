import React from 'react';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="Logo GoBarber" />

      <form>
        <h1>Faça seu Cadastro</h1>

        {/* Enviamos o ícone como propriedade do Input para utilizarmos no componente, lembramos que declaramos o type dele na interface como React.ComponentType, pq ele é um componente do react */}
        <Input name="name" icon={FiUser} placeholder="Nome" />

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="forgot">
        <FiArrowLeft />
        Voltar para Logon
      </a>
    </Content>
  </Container>
);

export default SignUp;
