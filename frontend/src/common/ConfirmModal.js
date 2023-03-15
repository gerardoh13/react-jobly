import React from "react";
import Modal from "react-bootstrap/Modal";

function ConfirmModal({ show, close, confirm }) {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Are you Sure?</Modal.Title>
        <button
          className="btn-close"
          aria-label="Close"
          onClick={close}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <p>This action cannot be undone.</p>
        <div className="float-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            data-bs-dismiss="modal"
            onClick={close}
          >
            Close
          </button>
          <button className="btn btn-danger" onClick={confirm}>
            Confirm
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmModal;
