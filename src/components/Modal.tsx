import React from 'react';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  open: boolean;
};

export const Modal: React.FC<ModalProps> = ({ title, children, onClose, open }) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white w-3/4 max-h-screen rounded-lg z-50">
        <div className="relative flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="absolute right-2 top-1/2 text-gray-400 hover:text-red-700" onClick={onClose}>X</button>
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};