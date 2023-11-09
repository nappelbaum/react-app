import React from "react";
import HeroBanner from "../components/mainPage/HeroBanner";
import Products from "../components/mainPage/Products";
import Parallax from "../components/mainPage/Parallax";
import News from "../components/mainPage/News";

const Main = ({ products }) => {
  return (
    <main className="site-main">
      <HeroBanner />
      <Products products={products} />
      <Parallax />
      <News />
    </main>
  );
};

export default Main;
