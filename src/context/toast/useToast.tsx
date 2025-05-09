import { AxiosResponse } from "axios";
import { createContext, useContext, useState } from "react";
import "./useToast.css";
export type ToastOptions = 'success' | 'error' | 'info' | 'warning';

type ToastType = {
    open: (message: string, option: ToastOptions) => void;
    openHTTP: (res: AxiosResponse) => void;
};

type ToastState = {
    message: string;
    type: ToastOptions;
    isOpen: boolean;
};

const ToastContext = createContext<ToastType>({
    open: () => {},
    openHTTP: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'info',
        isOpen: false
    });

    const open = (message: string, option: ToastOptions) => {
        setToast({ message, type: option, isOpen: true });
        setTimeout(() => setToast(prev => ({ ...prev, isOpen: false })), 1500);
    };

    const openHTTP = (res: AxiosResponse) => {
        const message = res.data?.message || 'Operación exitosa';
        const success = res.status >= 200 && res.status < 300;
        open(message, success ? 'success' : 'error');
    };

    return (
        <ToastContext.Provider value={{ open, openHTTP }}>
            {toast.isOpen && (
                <div className={`toast toast-${toast.type}`}>
                    <div className="toast-content">
                        <p className="toastMsj">{toast.message}</p>
                    </div>
                </div>
            )}
            {children}
        </ToastContext.Provider>
    );
};

