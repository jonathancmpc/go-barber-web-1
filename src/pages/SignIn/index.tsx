import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {
  Link,
  useHistory,
} from 'react-router-dom'; /* Para conseguir fazer a navegação entre as páginas da aplicação */

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import getValidationErros from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

// Interface formada para passar os tipos corretos para as informações de email e senha ao signIn(Context)
interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // Usando o Ref para passarmos os erros de validação para o Input.
  const formRef = useRef<FormHandles>(null);
  // Podemos verificar no console todas as funções que podemos utilizar para manipular o current dentro do useRef.
  /* console.log(formRef); */

  const history = useHistory();

  // Buscamos o método signIn em nosso Context, para salvarmos as informações do usuário para serem usadas em todas as páginas.
  // Fizemos um hook para o código ficar melhor visualmente para substiruir o useContext(AuthContext)
  const { signIn } = useAuth();
  const { addToast } = useToast();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        // Zerando os erros antes de começar a validação
        formRef.current?.setErrors({});

        /* Criado um schema de validação, utilizado para validar um objeto inteiro(.object) e terá a forma descrita no .shape. No nosso caso teremos o campo de nome, email e senha */
        const schema = Yup.object().shape({
          /* Neste caso, além de ser string, obrigatório, deve ser um email */
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          /* A senha é uma string com no mínimo 6 caracteres */
          password: Yup.string().required('Senha obrigatória'),
        });

        // Aguarde a validação(await) do schema com os dados recebidos pelo form
        // Passamos algumas configurações para a validação, como o abortEarly que retorna todos os erros que for encontrado(false), e não somente um(true). Recuperamos esses erros através do inner do validate(verificar o retorno do validate através do console.log(err)).
        await schema.validate(data, {
          abortEarly: false,
        });

        // Chamando o método signIn de dentro do nosso contexto de validação e passando os dados do usuário para validação na API e fornecimento das credenciais de usuário a todas as páginas dentro do Contexto.
        await signIn({
          email: data.email,
          password: data.password,
        });
        /* Redirecionando para a página de Dashboard depois da autenticação */
        history.push('/dashboard');
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
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credênciais',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        {/* Criamos o AnimationContainer para fazermos uma transição entre as páginas */}
        <AnimationContainer>
          <img src={logoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
