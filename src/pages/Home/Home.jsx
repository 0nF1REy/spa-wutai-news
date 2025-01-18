import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { findAll, getTopNews } from "../../services/newsServices";
import { HomeBody, HomeHeader } from "./HomeStyled";

export default function Home() {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState({});
  const [loading, setLoading] = useState(true);

  async function getAllNews() {
    setLoading(true);
    try {
      const newsResponse = await findAll(5, 0);
      console.log("Resposta do findAll:", newsResponse);
      const allNews = newsResponse.data.results;

      const topNewsResponse = await getTopNews(); 
      console.log("Resposta do topNews:", topNewsResponse);
      setTopNews(topNewsResponse.data.news);

      if (allNews && topNewsResponse.data.news) {
        const filteredNews = allNews.filter(
          (item) => item.id !== topNewsResponse.data.news.id
        );
        setNews(filteredNews);
      } else {
        setNews(allNews);
      }
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <>
      <HomeHeader>
        {loading ? (
          <p>Carregando dados da home...</p>
        ) : (
          topNews && (
            <Card
              top="true"
              title={topNews.title}
              text={topNews.text}
              banner={topNews.banner}
              likes={topNews.likes}
              comments={topNews.comments}
            />
          )
        )}
      </HomeHeader>
      <HomeBody>
        {news.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            text={item.text}
            banner={item.banner}
            likes={item.likes}
            comments={item.comments}
          />
        ))}
      </HomeBody>
    </>
  );
}
