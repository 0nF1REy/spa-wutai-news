import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../images/LogoWN.png";
import {
  ErrorSpan,
  ImageLogo,
  InputSpace,
  Nav,
  UserLoggedSpace,
} from "./NavbarStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { searchSchema } from "../../schemas/searchSchema";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { userLogged } from "../../services/userServices";
import { Profile } from "../../pages/Profile/Profile";
import { UserContext } from "../../Context/UserContext";

export function Navbar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  function onSearch(data) {
    const { title } = data;
    navigate(`/search/${title}`);
    reset();
  }

  async function findUserLogged() {
    setLoading(true);
    try {
      const response = await userLogged();
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setUser(response.data.results[0]);
      } else {
        console.error("Não foram encontrados dados de usuário na resposta.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function signout() {
    Cookies.remove("token");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, []);

  return (
    <>
      <Nav>
        <form onSubmit={handleSubmit(onSearch)}>
          <InputSpace>
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>

            <input
              {...register("title")}
              type="text"
              placeholder="Pesquise por um título"
            />
          </InputSpace>
        </form>

        <Link to="/">
          <ImageLogo src={logo} alt="Logo do Wutai News" />
        </Link>

        {user ? (
          <UserLoggedSpace>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <h2>{user?.name || "Carregando..."}</h2>
            </Link>
            <i className="bi bi-box-arrow-right" onClick={signout}></i>
          </UserLoggedSpace>
        ) : (
          <Link to="/auth">
            <Button type="button" text="Entrar">
              Entrar
            </Button>
          </Link>
        )}
      </Nav>
      {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
      <Outlet />
    </>
  );
}
