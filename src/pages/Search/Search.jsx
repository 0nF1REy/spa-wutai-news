import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchNews } from "../../services/newsServices";
import { ContainerResults, SearchNews, TextResults } from "./SearchStyled";
import { Card } from "../../components/Card/Card";

export function Search() {
  const { title } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  function isValidURL(str) {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  async function search() {
    setLoading(true);
    try {
      const newsApi = await searchNews(title);
      if (newsApi && newsApi.data && newsApi.data.foundNews) {
        setNews(newsApi.data.foundNews);
      } else {
        console.error("Não foram encontradas notícias para o título:", title);
        setNews([]);
      }
    } catch (err) {
      console.error("Erro ao buscar notícias:", err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search();
  }, [title]);

  return (
    <ContainerResults>
      <TextResults>
        <span>
          {news.length
            ? `Encontramos ${news.length} ${
                news.length > 1 ? "resultados" : "resultado"
              } para:`
            : "Não encontramos resultados para:"}
        </span>
        <h2>{title}</h2>
      </TextResults>
      {loading ? (
        <p>Carregando resultados...</p>
      ) : (
        <SearchNews>
          {news.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              text={item.text}
              banner={isValidURL(item.banner) ? item.banner : null}
              likes={item.likes}
              comments={item.comments}
            />
          ))}
        </SearchNews>
      )}
    </ContainerResults>
  );
}
