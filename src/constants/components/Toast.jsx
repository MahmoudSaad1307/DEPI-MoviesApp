import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function CustomToast(props) {
  const { state, content, onClose } = props;
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose(); // Notify parent to update its state
    }
  };

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        bg={state}
        onClose={handleClose}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;