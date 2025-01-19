import { useRouteError } from "react-router-dom";
import { ErrorContainer, ErrorMessage } from "./ErrorPageStyled";
import errorImage from "../../images/error-404.webp";
import { useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";

export default function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Navbar />
      <ErrorContainer>
        <h1>ERRO 404: PÁGINA NÃO ENCONTRADA</h1>
        <ErrorMessage>
          <p>
            A página não foi encontrada. Pode ter sido excluída ou
            temporariamente indisponível. Você pode tentar usar a barra de
            pesquisa acima para encontrar o que procura.
          </p>
        </ErrorMessage>
        <img src={errorImage} alt="Erro 404" />
      </ErrorContainer>
    </>
  );
}
