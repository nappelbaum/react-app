import React, { useEffect, useRef, useState } from "react";

const DelModal = ({
  delModalOpen,
  setDelModalOpen,
  performFunc,
  question,
  performBtn,
}) => {
  const modalForm = useRef();
  const overlay = useRef();
  const [exit, setExit] = useState(false);

  const modalOpen = function () {
    modalForm.current.hidden = false;
    overlay.current.hidden = false;
    modalForm.current.style.top = `${
      window.innerHeight / 2 - modalForm.current.offsetHeight / 2
    }px`;
    modalForm.current.style.left = `${
      window.innerWidth / 2 - modalForm.current.offsetWidth / 2
    }px`;
    modalForm.current.classList.remove("animated-rev");
    modalForm.current.classList.add("animated");
    overlay.current.style.opacity = "0.9";
  };

  const modalClose = function () {
    modalForm.current.classList.remove("animated");
    modalForm.current.classList.add("animated-rev");
    overlay.current.style.opacity = "0";
    const delay = exit ? 0 : 700;
    setTimeout(() => {
      modalForm.current.hidden = true;
      overlay.current.hidden = true;
    }, delay);
  };

  useEffect(() => {
    delModalOpen ? modalOpen() : modalClose();
  }, [delModalOpen]);

  return (
    <>
      <div
        className="col-lg-5 col-10 m-auto py-5 px-sm-5 px-3 bg-light modal-form"
        ref={modalForm}
        hidden
      >
        <div
          className="modal-close"
          onClick={() => setDelModalOpen(false)}
        ></div>
        <h2 className="text-center form-header">{question}</h2>
        <div className="mx-auto d-flex justify-content-between">
          <button
            className="btn btn-info btn-block"
            onClick={(e) => {
              e.target.textContent == "Выйти" && setExit(true);
              setDelModalOpen(false);
              performFunc();
            }}
          >
            {performBtn}
          </button>
          <button
            className="btn btn-info btn-block ml-3 mt-0"
            onClick={() => setDelModalOpen(false)}
          >
            Отмена
          </button>
        </div>
      </div>
      <div className="overlay" ref={overlay} hidden></div>
    </>
  );
};

export default DelModal;
