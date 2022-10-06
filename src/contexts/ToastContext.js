import { useState, createContext, useContext, useEffect } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const message = useToastProvider();

  return (
    <ToastContext.Provider value={message}>{children}</ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};

function useToastProvider() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (message !== '') {
      setTimeout(() => {
        setMessage(null);
        setType(null);
      }, 3000);
    }
  }, [message]);

  const setToast = (message, type) => {
    setMessage(message);
    setType(type);
  };

  return { message, setToast, type };
}
