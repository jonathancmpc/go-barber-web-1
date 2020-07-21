import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  // Usando o Ref para passarmos os erros de validação para o Input.
  const formRef = useRef<FormHandles>(null);
  // Podemos verificar no console todas as funções que podemos utilizar para manipular o current dentro do useRef.
  /* console.log(formRef); */

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(async (data: object) => {
    try {
      // Zerando os erros antes de começar a validação
      formRef.current?.setErrors({});

      /* Criado um schema de validação, utilizado para validar um objeto inteiro(.object) e terá a forma descrita no .shape. No nosso caso teremos o campo de nome, email e senha */
      const schema = Yup.object().shape({
        /* Este campo será do tipo string e será obrigatório(requered) */
        name: Yup.string().required('Nome obrigatório'),
        /* Neste caso, além de ser string, obrigatório, deve ser um email */
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        /* A senha é uma string com no mínimo 6 caracteres */
        password: Yup.string().min(
          6,
          'A senha deve ter pelo menos 6 caracteres',
        ),
      });

      // Aguarde a validação(await) do schema com os dados recebidos pelo form
      // Passamos algumas configurações para a validação, como o abortEarly que retorna todos os erros que for encontrado(false), e não somente um(true). Recuperamos esses erros através do inner do validate(verificar o retorno do validate através do console.log(err)).
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      // console.log(err);

      // Utilizando a função que criamos para percorrer os erros e trazer um objeto com o name:mensagem que passamos no yup.
      const errors = getValidationErros(err);
      // console.log(errors);

      // Enviando os erros para aparecer no input através do useRef/Unform com a variável error(input). Onde errors é um objeto retornado da função getValidationErrors com o name de cada input.
      // Traz as mensagens de erros que configuramos no Yup.
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="Logo GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>
        <a href="forgot">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
