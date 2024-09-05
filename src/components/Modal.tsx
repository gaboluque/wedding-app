import React from 'react';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

export const Modal: React.FC<ModalProps> = ({ title, children, onClose, open, containerProps }) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white w-full md:w-3/4 max-h-screen rounded-lg z-50" {...containerProps}>
        <div className="relative flex justify-between items-center h-14">
          <h2 className="text-lg font-semibold w-full px-5">{title}</h2>
          <button className="absolute right-2 top-2 text-gray-400 hover:text-red-700 hover:bg-transparent bg-transparent font-mono" onClick={onClose}>X</button>
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
