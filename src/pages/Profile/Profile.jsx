import React, { useContext, useEffect, useState } from 'react';
import {
  ProfileActions,
  ProfileAvatar,
  ProfileBackground,
  ProfileContainer,
  ProfileHeader,
  ProfileIconAdd,
  ProfileIconEdit,
  ProfileNews,
  ProfileUser,
} from "./ProfileStyled";
import { Link } from "react-router-dom";
import { Card } from "../../components/Card/Card";
import { getAllNewsByUser } from "../../services/newsServices";
import { userLogged } from '../../services/userServices';
import { UserContext } from '../../Context/UserContext';
import Cookies from 'js-cookie';

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUserData() {
    try {
        const response = await userLogged();
        if(response.data && response.data.results && response.data.results.length > 0) {
          setUser(response.data.results[0]);
        } else {
          console.error('Não foram encontrados dados de usuário na resposta.');
        }
    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error)
    }
  }
    
   async function findAllNewsByUser() {
    try {
         const newsResponse = await getAllNewsByUser();
          setNews(newsResponse.data.results);
    } catch (error) {
      console.error("Erro ao buscar notícias do usuário:", error);
    } 
  }


  useEffect(() => {
     setLoading(true);
      if (Cookies.get("token")) {
        fetchUserData();
      }
        findAllNewsByUser()
          .finally(() => setLoading(false));
  }, []);


    if (loading) {
        return <p>Carregando perfil...</p>;
    }
    
    if(!user) {
       return <p>Você não está logado ou o seu token é inválido. Por favor, faça o login novamente.</p>
     }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileIconEdit>
          <i className="bi bi-pencil-square"></i>
        </ProfileIconEdit>
        <ProfileBackground src={user.background} alt="" />
        <ProfileUser>
          <ProfileAvatar src={user.avatar} alt="Foto do usuário" />
          <h2>{user.name}</h2>
          <h3>@{user.username}</h3>
        </ProfileUser>
        <ProfileActions>
          <Link to="/manage-news/add/news">
            <ProfileIconAdd>
              <i className="bi bi-plus-circle"></i>
            </ProfileIconAdd>
          </Link>
        </ProfileActions>
      </ProfileHeader>
      <ProfileNews>
        {news.length === 0 && <h3>Você ainda não criou nenhuma noticia...</h3>}

        {news.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              text={item.text}
              banner={item.banner}
              likes={item.likes}
              comments={item.comments}
              actions={true}
            />
          );
        })}
      </ProfileNews>
    </ProfileContainer>
  );
}