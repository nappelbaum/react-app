import React from "react";
import search from "../../img/svg/search.svg";
import cart from "../../img/svg/shopping-cart.svg";
import heart from "../../img/svg/heart.svg";

const Products = ({ products }) => {
  return (
    <section className="section-margin calc-60px">
      <div className="container">
        <div className="section-intro pb-60px">
          <p>Popular Item in the market</p>
          <h2>
            Trending <span className="section-intro__style">Product</span>
          </h2>
        </div>
        <div className="row">
          {products.map((el) => (
            <div className="col-md-6 col-lg-4 col-xl-3" key={el[0]}>
              <div className="card text-center card-product">
                <div className="card-product__img">
                  <div className="card-product__img-wrapper">
                    <img
                      className="card-img"
                      src={`https://bohohome.ru/images/items/${el[2]}`}
                      alt=""
                    />
                  </div>
                  <ul className="card-product__imgOverlay">
                    <li>
                      <button>
                        <img src={search}></img>
                      </button>
                    </li>
                    <li>
                      <button>
                        <img src={cart}></img>
                      </button>
                    </li>
                    <li>
                      <button>
                        <img src={heart}></img>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <p>{el[1]}</p>
                  <h4 className="card-product__title">
                    <a href="single-product.html">{el[3]}</a>
                  </h4>
                  <p className="card-product__price">{el[4]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
