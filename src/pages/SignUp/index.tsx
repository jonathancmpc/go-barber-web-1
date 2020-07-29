import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../context/ToastContext';

import getValidationErros from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // Usando o Ref para passarmos os erros de validação para o Input.
  const formRef = useRef<FormHandles>(null);
  // Podemos verificar no console todas as funções que podemos utilizar para manipular o current dentro do useRef.
  /* console.log(formRef); */

  const { addToast } = useToast();
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
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
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        // Aguarde a validação(await) do schema com os dados recebidos pelo form
        // Passamos algumas configurações para a validação, como o abortEarly que retorna todos os erros que for encontrado(false), e não somente um(true). Recuperamos esses erros através do inner do validate(verificar o retorno do validate através do console.log(err)).
        await schema.validate(data, {
          abortEarly: false,
        });

        /* Após realizada a autenticação, cadastramos o usuário na API passando os dados do formulário */
        await api.post('/users', data);
        /* Se foi cadastrado na API corretamente então mostramos a mensagem de sucesso utilizando o Toast e redirecionamos para a rota de login(signIn). Caso dê algum erro vamos implementar também no catch o código */
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
        });
        /* Fazendo o redirecionamento */
        history.push('/');
      } catch (err) {
        // console.log(err);

        // Se o erros forem originados no Yup validate através da instancia do Yup chamada ValidationError então pegamos os erros para mostrar
        if (err instanceof Yup.ValidationError) {
          // Utilizando a função que criamos para percorrer os erros e trazer um objeto com o name:mensagem que passamos no yup.
          const errors = getValidationErros(err);
          // console.log(errors);

          // Enviando os erros para aparecer no input através do useRef/Unform com a variável error(input). Onde errors é um objeto retornado da função getValidationErrors com o name de cada input.
          // Traz as mensagens de erros que configuramos no Yup.
          formRef.current?.setErrors(errors);

          /* Com o return, ele não continua processando o resto do código quando o erro não for de validação */
          return;
        }

        // Se não estiver instânciado em validationError, então retornamos uma mensagem genérica para mostrar nos Toast
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro, verifique os dados e tente novamente',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
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
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
