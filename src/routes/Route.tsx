import React from 'react';
/* Importando todas as props que uma rota pode ter para passarmos no componente Route */
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

/* Importando o contexto de autenticação para verificar se o usuário está logado ou não */
import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  /* Reescrevemos a propriedade component para ComponentType pq assim ele retorna o componente neste formato {Dashboard} ao invés desse <Dashboard /> */
  component: React.ComponentType;
}

/*
CASOS QUE PODEM OCORRER
  RotaPrivada(isPrivate) / UsuarioAutenticado(!!user)
  true/true = Ok
  true/false = Redirecionar ele para o login
  false/true = Redirecionar para o dashboard
  false/false = Permanece na rota, pois não é privada
*/

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  /* Retornando a rota com o render, que é onde nós fazemos a nossa lógica. O render permite modificar a forma como a rota é fetira/retornada por padrão */
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        /* Vamos fazer a verificação - Se a rota privada é true e está logado true(existe user) então retorna o componente dessa rota */
        return isPrivate === !!user ? (
          <Component />
        ) : (
          /* Se não, ou seja se isPrivate(rota privada) não for igual a !!user(logado) então é redirecionado. Então no redirecionamento se a rota for privada, então redireciona para a página de login se não manda para o Dashboard */
          /* O state from location serve para não perdermos o histórico do usuário para quando a aplicação fizer o redirecionamento faça de maneira mais rápida utilizando o histórico que está em memória */
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
