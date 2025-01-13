import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { findAll } from "../../services/newsServices.js";
import { HomeBody } from "./HomeStyled";

export default function Home() {
  let news;

  async function findAll() {
    const response = await getAll();
    news = response.data.results;
  }

  findAll();
  console.log(news);

  return (
    <>
      <Navbar />
      <HomeBody>
        {news.map((item, index) => (
          <Card key={index} news={item} />
        ))}
      </HomeBody>
    </>
  );
}
