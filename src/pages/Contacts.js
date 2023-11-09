import React from "react";
import LoginBanner from "../components/LoginBanner";
import { YMaps } from "@pbe/react-yandex-maps";
import Map from "../components/UI/map/Map";

const Contacts = () => {
  //   const adressSpan = document.querySelector(".adress-span");

  // ymaps.ready(init);

  // function init() {
  //   const myGeocoder = ymaps.geocode(adressSpan.textContent);
  //   myGeocoder.then(
  //     function (res) {
  //       const coords = res.geoObjects.get(0).geometry.getCoordinates();

  //       myMap = new ymaps.Map("map", {
  //         center: coords,
  //         zoom: 15,
  //       });

  //       const myPlacemark = new ymaps.Placemark(
  //         coords,
  //         { iconContent: "Boho-Home" },
  //         {
  //           preset: "islands#redStretchyIcon",
  //         }
  //       );
  //       myMap.geoObjects.add(myPlacemark);
  //     },
  //     function (err) {
  //       alert("Ошибка получения карты");
  //     }
  //   );
  // }

  return (
    <YMaps
      query={{
        load: "package.full",
        apikey: "2c01faf2-15f0-4a0f-861c-42f4e6702a65",
      }}
    >
      <div>
        <LoginBanner bannerHeader={"Наши контакты"} />

        <section className="section-margin--small mt-5">
          <div className="container">
            <div className="d-none d-sm-block mb-5 pb-4">
              <Map />
            </div>

            <div className="row">
              <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-home"></i>
                  </span>
                  <div className="media-body">
                    <h3>California United States</h3>
                    <p>Santa monica bullevard</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-headphone"></i>
                  </span>
                  <div className="media-body">
                    <h3>
                      <a href="tel:454545654">00 (440) 9865 562</a>
                    </h3>
                    <p>Mon to Fri 9am to 6pm</p>
                  </div>
                </div>
                <div className="media contact-info">
                  <span className="contact-info__icon">
                    <i className="ti-email"></i>
                  </span>
                  <div className="media-body">
                    <h3>
                      <a href="mailto:support@colorlib.com">
                        support@colorlib.com
                      </a>
                    </h3>
                    <p>Send us your query anytime!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-9">
                <form
                  action="#/"
                  className="form-contact contact_form"
                  method="post"
                  id="contactForm"
                  noValidate="novalidate"
                >
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="name"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="email"
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          name="subject"
                          id="subject"
                          type="text"
                          placeholder="Enter Subject"
                        />
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="form-group">
                        <textarea
                          className="form-control different-control w-100"
                          name="message"
                          id="message"
                          cols="30"
                          rows="5"
                          placeholder="Enter Message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="form-group text-center text-md-right mt-3">
                    <button
                      type="submit"
                      className="button button--active button-contactForm"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </YMaps>
  );
};

export default Contacts;
