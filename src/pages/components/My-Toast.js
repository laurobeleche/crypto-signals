import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const MyToast = ({ isOpen, title, message, bgClass }) => {
  return (
    <Toast isOpen={isOpen} className={`${bgClass} text-white position-absolute`} style={{ top: 60, right: 20, zIndex: 1050 }} >
      <ToastHeader>
        <strong className="me-auto">{title}</strong>
      </ToastHeader>
      <ToastBody>{message}</ToastBody>
    </Toast>
  );
};

export default MyToast;
