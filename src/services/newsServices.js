import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleRequestError = (error, message) => {
  if (error.response) {
    console.error(
      `${message} - Status: ${error.response.status}, Data:`,
      error.response.data
    );
    throw new Error(
      `${message} - Status: ${error.response.status}, Data: ${JSON.stringify(
        error.response.data
      )}`
    );
  } else if (error.request) {
    console.error(`${message} - Não houve resposta do backend:`, error.request);
    throw new Error(`${message} - Não houve resposta do backend`);
  } else {
    console.error(
      `${message} - Erro ao configurar a requisição:`,
      error.message
    );
    throw new Error(
      `${message} - Erro ao configurar a requisição: ${error.message}`
    );
  }
};

export const findAll = async () => {
  try {
    const response = await api.get("/news");
    return response;
  } catch (error) {
    handleRequestError(error, "Erro ao buscar todas as notícias");
  }
};

export const getTopNews = async () => {
  try {
    const response = await api.get("/news/top");
    return response;
  } catch (error) {
    handleRequestError(error, "Erro ao buscar notícias em destaque");
  }
};

export const searchNews = async (title) => {
  try {
    const response = await api.get(`/news/search?title=${title}`);
    return response;
  } catch (error) {
    handleRequestError(error, "Erro ao buscar notícias pela pesquisa");
  }
};

export const getAllNewsByUser = async () => {
  try {
    const response = await api.get("/news/byUser", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleRequestError(error, "Erro ao buscar notícias do usuário");
  }
};

export const createNews = async (body) => {
  try {
    const response = await api.post("/news", body, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleRequestError(error, "Erro ao criar uma nova notícia");
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await api.get(`/news/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleRequestError(error, "Erro ao buscar notícia pelo ID");
  }
};
