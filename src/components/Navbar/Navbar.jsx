import logo from "../../images/LogoWN.png";
import "./Navbar.css"

export function Navbar() {
  return (
    <>
      <nav>
        <div className="input-search-space">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Pesquise por um título" />
        </div>
        <img src={logo} alt="Logo do Wutai News" />

        <button>Entrar</button>
      </nav>
    </>
  );
}
