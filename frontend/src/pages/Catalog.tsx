// Catalog.tsx
import { Outlet } from "react-router-dom";
import "../css/catalog.css";

import { LinkCard } from "../components/Cards/LinkCard/LinkCard";

export const Catalog = () => {
  return (
    <main>
      <section className="catalog__name">
        <h1>Расходные материалы для электроэрозионных станков</h1>
      </section>
      <nav className="catalog catalog__nav">
        <ul className="catalog__ul">
          <li className="catalog__li">
            <LinkCard
              title="ФИЛЬТРА"
              image="../public/img/filters.png"
              path="/catalog/filters"
            />
          </li>
          <li className="catalog__li">
            <LinkCard
              title="СМОЛА"
              image="../public/img/resin.jpg"
              path="/catalog/resin"
            />
          </li>
          <li className="catalog__li">
            <LinkCard
              title="ПРОВОЛОКА"
              image="../public/img/wire.jpg"
              path="/catalog/wire"
            />
          </li>
          <li className="catalog__li">
            <LinkCard
              title="СОПЛА"
              image="../public/img/nozzles.jpg"
              path="/catalog/nozzles"
            />
          </li>
          <li className="catalog__li">
            <LinkCard
              title="КОНТ. ЩЕТКИ"
              image="../public/img/brushes.png"
              path="/catalog/brushes"
            />
          </li>
          <li className="catalog__li">
            <LinkCard
              title="НАПРАВЛЯЮЩИЕ"
              image="../public/img/guides.jpg"
              path="/catalog/guides"
            />
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
};