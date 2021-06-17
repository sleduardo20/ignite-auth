import { Container, Title, Description, Illutration, Logo } from './styles';

export const Main = ({ title = 'React Avançado' }) => {
  return (
    <Container>
      <Logo src="/img/logo.svg" alt="Logo React Avançado" />
      <Title>{title}</Title>
      <Description>Typescript, ReactJS, NextJS e Styled Components</Description>
      <Illutration
        src="/img/hero-illustration.svg"
        alt="Um dev com a tela do código"
      />
    </Container>
  );
};
