import { useEffect, useState } from "react";

import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { findAll, getTopNews } from "../../services/newsServices";
import { HomeBody, HomeHeader } from "./HomeStyled";
import Cookies from "js-cookie";

export default function Home() {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState({});

  async function getAllNews() {
    const newsResponse = await findAll();
    setNews(newsResponse.data.results);

    const topNewsResponse = await getTopNews();
    setTopNews(topNewsResponse.data.news);
  }

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <>
      <HomeHeader>
        <Card
          top="true"
          title={topNews.title}
          text={topNews.text}
          banner={topNews.banner}
          likes={topNews.likes}
          comments={topNews.comments}
        />
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
