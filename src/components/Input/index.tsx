import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

// Temos que passar os parâmetros que o input vai receber como obrigatórios, porém ele recebe todas as propriedades que um input comum do html vai receber, por isso extendemos as propriedades que já existem por padrão no input
// Importamos o IconBaeProps de dentro do react-icons, pois ele traz todas as propriedades que um ícone deve receber, então passamos como tipo do React.ComponentType.
// o ?: significa que esta propriedade é opcional, neste caso não temos icones em todos os inputs.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

// Passamos então ao nosso Function Components os atributos que terão nesse componente de Input, dessa forma temos todas as propriedades disponíveis para um input comum sendo que o name passa a ser obrigatório.
// Passamos todas as propriedades vindas da interface com o spread ...rest. Declaramos como propriedade vindas da página principal, os icones e o resto das propriedades
// Como o ícone tem que ser passado em forma de componente para o HTML, temos que transformar a propriedade icon e Icon com o I maiúsculo.
// Fazemos uma verificação no ícone, se o ícone existir, então mostra ele.
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};
export default Input;
