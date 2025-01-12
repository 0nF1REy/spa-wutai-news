import logo from "../../images/LogoWN.png";
import { Button, ImageLogo, InputSpace, Nav } from "./NavbarStyled";

export function Navbar() {
  return (
    <>
      <Nav>
        <InputSpace>
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Pesquise por um título" />
        </InputSpace>
        <ImageLogo src={logo} alt="Logo do Wutai News" />

        <Button>Entrar</Button>
      </Nav>
    </>
  );
}
