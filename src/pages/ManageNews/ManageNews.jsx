import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNewsStyled";
import { newsSchema } from "../../schemas/newsSchema";
import {
  createNews,
  deleteNews,
  editNews,
  getNewsById,
} from "../../services/newsServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useEffect } from "react";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";

export function ManageNews() {
  const { action, id } = useParams();
  const navigate = useNavigate();

  const {
    register: registerNews,
    handleSubmit: handleRegisterNews,
    formState: { errors: errorsRegisterNews },
    setValue,
  } = useForm({ resolver: zodResolver(newsSchema) });

  async function registerNewsSubmit(data) {
    try {
      await createNews(data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function editNewsSubmit(data) {
    try {
      await editNews(data, id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function findNewsById(id) {
    try {
      const response = await getNewsById(id);
      if (response.data && response.data.news) {
        const data = response.data.news;
        setValue("title", data.title);
        setValue("banner", data.banner);
        setValue("text", data.text);
      } else {
        console.error("Não foi encontrada nenhuma notícia para o id", id);
      }
    } catch (error) {
      console.error("Erro ao buscar notícias para edição:", error);
    }
  }

  async function deleteNewsSubmit() {
    try {
      await deleteNews(id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (action === "edit" || action === "delete") {
      findNewsById(id);
    }
  }, [action, id]);

  return (
    <AddNewsContainer>
      <h2>
        {action === "add"
          ? "Adicionar"
          : action === "edit"
          ? "Atualizar"
          : "Apagar"}{" "}
        Notícia
      </h2>
      <form
        onSubmit={
          action === "add"
            ? handleRegisterNews(registerNewsSubmit)
            : action === "edit"
            ? handleRegisterNews(editNewsSubmit)
            : handleRegisterNews(deleteNewsSubmit)
        }
      >
        <Input
          type="text"
          placeholder="Titulo"
          name="title"
          register={registerNews}
          disabled={action === "delete"}
          defaultValue=""
        />
        {errorsRegisterNews.title && (
          <ErrorSpan>{errorsRegisterNews.title.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Link da imagem"
          name="banner"
          register={registerNews}
          disabled={action === "delete"}
          defaultValue=""
        />
        {errorsRegisterNews.banner && (
          <ErrorSpan>{errorsRegisterNews.banner.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Texto"
          name="text"
          register={registerNews}
          isInput={false}
          disabled={action === "delete"}
          defaultValue=""
        />
        {errorsRegisterNews.text && (
          <ErrorSpan>{errorsRegisterNews.text.message}</ErrorSpan>
        )}

        <Button
          type="submit"
          text={
            action === "add"
              ? "Adicionar"
              : action === "edit"
              ? "Atualizar"
              : "Apagar"
          }
        />
      </form>
    </AddNewsContainer>
  );
}
