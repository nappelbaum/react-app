import React from "react";

const ModalWin = ({ showModal, header, caption }) => {
  return (
    <div
      className={`modal fade${showModal ? " show-modal" : ""}`}
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <h5 className="modal-title text-center" id="staticBackdropLabel">
              {header}
            </h5>
          </div>
          <div className="modal-body text-center">{caption}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalWin;
