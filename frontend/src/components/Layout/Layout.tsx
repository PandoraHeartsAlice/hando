//Layout.tsx
import { Link, Outlet, useLocation } from "react-router-dom";
import "./layout.css";

import { SliderCatalog } from "../../pages/SliderCatalog/SliderCatalog";
import { Footer } from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="container">
      <header className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <Link className="header__link" to={"/catalog"}>
              HANDO A-TEC INC
            </Link>
          </li>
          <li className="header__li">
            <Link className="header__link" to={"/stock"}>
              ТОВАРЫ ПО АКЦИИ
            </Link>
          </li>
          <li className="header__li">
            <Link className="header__link" to={"/about"}>
              О НАС
            </Link>
          </li>
          <li className="header__li header__basket">
            <Link className="header__link" to={"/basket"}>
              КОРЗИНА
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
        {location.pathname === "/" && <SliderCatalog />}
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
