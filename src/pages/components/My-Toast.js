import React from 'react';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const MyToast = ({ isOpen, title, message, bgClass }) => {
  return (
    <div style={{ position: 'fixed', top: 60, right: 20, zIndex: 1050 }}>
      <Toast isOpen={isOpen} className={`${bgClass} text-white`} >
        <ToastHeader>
          <strong className="me-auto">{title}</strong>
        </ToastHeader>
        <ToastBody>{message}</ToastBody>
      </Toast>
    </div>
  );
};

export default MyToast;

