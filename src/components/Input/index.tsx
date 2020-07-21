import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// Temos que passar os parâmetros que o input vai receber como obrigatórios, porém ele recebe todas as propriedades que um input comum do html vai receber, por isso extendemos as propriedades que já existem por padrão no input
// Importamos o IconBaeProps de dentro do react-icons, pois ele traz todas as propriedades que um ícone deve receber, então passamos como tipo do React.ComponentType.
// o ?: significa que esta propriedade é opcional, neste caso não temos icones em todos os inputs.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

// Passamos então ao nosso Function Components(FC) os atributos que terão nesse componente de Input, dessa forma temos todas as propriedades disponíveis para um input comum sendo que o name passa a ser obrigatório.
// Passamos todas as propriedades vindas da interface com o spread ...rest. Declaramos como propriedade vindas da página principal, os icones e o resto das propriedades
// Como o ícone tem que ser passado em forma de componente para o HTML, temos que transformar a propriedade icon e Icon com o I maiúsculo.
// Fazemos uma verificação no ícone, se o ícone existir, então mostra ele.
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false); /* Começa como falso */
  const [isFilled, setIsFilled] = useState(false); /* Começa como falso */

  // com o useField do Unform, podemos verificar o conteúdo(value) dos inputs através da tag name.
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    /* A ? informa que Se inputRef.current tiver alguma coisa, ele verifica o value dele */
    /* Se o input tem algum valor adicionamos no estado de preenchido(Filled), se não continua false. Iremos utilizar essa condição para deixar nosso ícone laranjado quando tiver alguma coisa dentro do nosso input */
    /* if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    } */

    // Porém temos uma outra forma de representar essa consição transformando o valor do input em booleano com as !!. Ou seja, se tiver valor ele retorna true, se não, ele retorna false:
    setIsFilled(!!inputRef.current?.value);
  }, []); /* Vazio a função nunca é recriada, ou seja, NÃO estamos colocando o monitoramento se alguma variável alterar ele executa novamente */

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  /* Criando a função para informar ao Container que o input tem foco ou não. Com o Callback essa função só será executada uma vez e memorizada */
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    /* Passamos então o estado atual do foco e do preenchimento do input(Filled) para o container, pq ele que estiliza o nosso input. Não esquecer de passar o tipo dele lá na interface do styles */
    // Além disso também passamos o isErrored que envia para o Container se existe ou não erro na variável error.
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        /* Recebeu foco, armazenamos true no estado dele falando que ele tem o foco */
        onFocus={handleInputFocus}
        /* Perdeu o foco, armazena false no estado com a função hanbleInputBlur */
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {/* Caso exista o erro, mostre o ícone */}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
