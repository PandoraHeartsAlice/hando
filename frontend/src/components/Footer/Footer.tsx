import { Link, useLocation } from "react-router-dom";
import style from "./Footer.module.css";

export const Footer = () => {
  const location = useLocation();
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <footer>
      <div className={style.container}>
        <section>
          <h3 className={style.navHead}>Разделы</h3>
          <nav className={style.navigation}>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog") ? style.headerLinkActive : ""
              }`}
              to={"/catalog"}
            >
              HANDO A-TEC INC
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/stock") ? style.headerLinkActive : ""
              }`}
              to={"/stock"}
            >
              ТОВАРЫ ПО АКЦИИ
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/about") ? style.headerLinkActive : ""
              }`}
              to={"/about"}
            >
              О НАС
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/basket") ? style.headerLinkActive : ""
              }`}
              to={"/basket"}
            >
              КОРЗИНА
            </Link>
          </nav>
        </section>
        <section>
          <h3 className={style.navHead}>Наши товары</h3>
          <nav className={style.navigation}>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog/filters") ? style.headerLinkActive : ""
              }`}
              to="/catalog/filters"
            >
              ФИЛЬТРА
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog/resin") ? style.headerLinkActive : ""
              }`}
              to="/catalog/resin"
            >
              СМОЛА
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog/wire") ? style.headerLinkActive : ""
              }`}
              to="/catalog/wire"
            >
              ПРОВОЛОКА
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog/nozzles") ? style.headerLinkActive : ""
              }`}
              to="/catalog/nozzles"
            >
              СОПЛА
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog/brushes") ? style.headerLinkActive : ""
              }`}
              to="/catalog/brushes"
            >
              КОНТ. ЩЕТКИ
            </Link>
            <Link
              className={`${style.navLink} ${
                isActive("/catalog/guides") ? style.headerLinkActive : ""
              }`}
              to="/catalog/guides"
            >
              НАПРАВЛЯЮЩИЕ
            </Link>
          </nav>
        </section>
        <section className={style.navigation}>
          <h3 id="contacts-header" className={style.navHead}>
            Контакты
          </h3>
          <address>
            <p className={style.navLinks}>
              Телефон:{" "}
              <a className={style.navLinkStyle} href="tel:+71234567890">
                +7 123 456-78-90
              </a>
            </p>
            <p className={style.navLinks}>
              Email:{" "}
              <a
                className={style.navLinkStyle}
                href="mailto:info@handoatec.ru"
              >
                info@handoatec.ru
              </a>
            </p>
            <p className={style.navLinks}>Адрес: Москва, ул. Пушкина, д. 1</p>
          </address>
          <time className={style.navLinks}>
            Часы работы: Пн-Пт с 9:00 до 18:00
          </time>
        </section>
      </div>
    </footer>
  );
};
