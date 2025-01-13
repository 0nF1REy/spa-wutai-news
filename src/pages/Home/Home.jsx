import { useEffect, useState } from "react";

import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { findAll } from "../../services/newsServices";
import { HomeBody } from "./HomeStyled";

export default function Home() {
  const [news, setNews] = useState([]);

  async function findAll() {
    const response = await getAll();
    setNews(response.data.results);
  }

  useEffect(() => {
    findAll();
  }, []);

  console.log(news);

  return (
    <>
      <Navbar />
      <HomeBody>
        {news.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            text={item.text}
            banner={item.banner}
            likes={item.likes.length}
            comments={item.comments.length}
          />
        ))}
      </HomeBody>
    </>
  );
}
