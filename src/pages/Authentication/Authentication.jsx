import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/signinSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signupSchema } from "../../schemas/signupSchema";
import { signin, signup } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

export function Authentication() {
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
    setError: setErrorSignup,
  } = useForm({ resolver: zodResolver(signupSchema) });

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
    setError,
  } = useForm({ resolver: zodResolver(signinSchema) });

  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  async function inHandleSubmit(data) {
    try {
      const response = await signin(data);
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      if (error?.response?.status === 404) {
        setLoginError("Os dados de login informados são inválidos. Por favor, verifique seu e-mail ou senha e tente novamente.");
        setError("password", { message: " " });
        setError("email", { message: " " });
      } else {
        setLoginError("Erro ao fazer login");
      }
    }
  }

  const navigate = useNavigate();

  async function upHandleSubmit(data) {
    try {
      const response = await signup(data);
      Cookies.set("token", response.data.token, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer cadastro: ", error);
      if (error?.response?.status === 409) {
        setSignupError("O e-mail informado já está cadastrado em nosso sistema.");
        setErrorSignup("email", { message: " " });
      } else {
        setSignupError("Erro ao fazer cadastro");
      }
    }
  }

  return (
    <AuthContainer>
      <Section type="signin">
        <h2>Entrar</h2>
        <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignin}
          />

          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignin}
          />
          {loginError ||
          (errorsSignin.email?.message && errorsSignin.email.message) ||
          (errorsSignin.password?.message && errorsSignin.password.message) ? (
            <ErrorSpan>
              {loginError ||
                errorsSignin.email?.message ||
                errorsSignin.password?.message}
            </ErrorSpan>
          ) : null}
          <Button type="submit" text="Entrar" />
        </form>
      </Section>

      <Section type="signup">
        <h2>Cadastrar</h2>
        <form onSubmit={handleSubmitSignup(upHandleSubmit)}>
          <Input
            type="text"
            placeholder="Nome"
            name="name"
            register={registerSignup}
          />
          {errorsSignup.name && (
            <ErrorSpan>{errorsSignup.name.message}</ErrorSpan>
          )}
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
            register={registerSignup}
          />
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            register={registerSignup}
          />
          {errorsSignup.password && (
            <ErrorSpan>{errorsSignup.password.message}</ErrorSpan>
          )}
          <Input
            type="password"
            placeholder="Confirmar senha"
            name="confirmPassword"
            register={registerSignup}
            mc
          />
          {errorsSignup.confirmPassword && (
            <ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>
          )}
          {signupError || errorsSignup.email?.message ? (
            <ErrorSpan>{signupError || errorsSignup.email?.message}</ErrorSpan>
          ) : null}
          <Button type="submit" text="Cadastrar" />
        </form>
      </Section>
    </AuthContainer>
  );
}
