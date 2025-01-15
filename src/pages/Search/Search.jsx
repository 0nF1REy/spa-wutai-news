import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchNews } from "../../services/newsServices";
import { ContainerResults, SearchNews, TextResults } from "./SearchStyled";
import { Card } from "../../components/Card/Card";

export function Search() {
    const { title } = useParams();
    const [news, setNews] = useState([]);

    function isValidURL(str) {
        try {
          new URL(str);
          return true;
        } catch (e) {
          return false;
        }
      }
    async function search() {
        try {
        const newsApi = await searchNews(title);
        setNews(newsApi.data.foundNews);
        console.log(newsApi);
        } catch (err) {
        console.log(err);
        setNews([]);
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
        </ContainerResults>
    );
}