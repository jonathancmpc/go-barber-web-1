import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// Como não vamos criar nada e nem deixar nenhum atributo obrigatório, convertemos a interface simplismente em type.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// O type do button deve ser declarado sempre, mas como tempos propriedades vindas do nosso index principal, se a propriedade type for declarada no index principal, então vai sobreescrever o type passado aqui no componente.
// Passamos o children para capturar o texto/filho da tag button lá no nosso index principal, então colocamos o restante das props na variável ...rest.
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
