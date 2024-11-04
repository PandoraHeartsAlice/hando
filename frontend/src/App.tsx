import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout/Layout.tsx";
import { AboutUs } from "./pages/AboutUs/AboutUs.tsx";
import { Stock } from "./pages/Stock.tsx";
import { Catalog } from "./pages/Catalog.tsx";
import { SliderCatalog } from "./pages/SliderCatalog/SliderCatalog.tsx";
import { Basket } from "./pages/Basket/Basket.tsx";

import { NoMatch } from "./pages/NoMatch/NoMatch.tsx";

import { Filters } from "./pages/catalog/Filters/Filters.tsx";
import { Resin } from "./pages/catalog/Resins/Resins.tsx";
import { Wire } from "./pages/catalog/Wire/Wire.tsx";
import { Brushes } from "./pages/catalog/Brushes/Brushes.tsx";
import { Nozzles } from "./pages/catalog/Nozzles/Nozzles.tsx";
import { Guides } from "./pages/catalog/Guides/Guides.tsx";

import { BasketProvider } from "./components/Context/BasketContext.tsx";

export const App = () => {
  return (
    <>
      <BasketProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Catalog />} />
            <Route path="catalog/*" element={<Catalog />}>
              <Route index element={<SliderCatalog />} />
              <Route path="filters" element={<Filters />} />
              <Route path="resin" element={<Resin />} />
              <Route path="wire" element={<Wire />} />
              <Route path="brushes" element={<Brushes />} />
              <Route path="nozzles" element={<Nozzles />} />
              <Route path="guides" element={<Guides />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
            <Route path="about" element={<AboutUs />} />
            <Route path="stock" element={<Stock />} />
            <Route path="basket" element={<Basket />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BasketProvider>
    </>
  );
};
