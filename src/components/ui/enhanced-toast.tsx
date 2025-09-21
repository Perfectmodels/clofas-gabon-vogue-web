import { toast as sonnerToast } from "sonner";

export const showToast = {
  success: (title: string, description?: string) => {
    sonnerToast.success(title, {
      description,
      duration: 4000,
      className: "bg-green-50 border-green-200 text-green-800",
    });
  },
  
  error: (title: string, description?: string) => {
    sonnerToast.error(title, {
      description,
      duration: 5000,
      className: "bg-red-50 border-red-200 text-red-800",
    });
  },
  
  warning: (title: string, description?: string) => {
    sonnerToast.warning(title, {
      description,
      duration: 4000,
      className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    });
  },
  
  info: (title: string, description?: string) => {
    sonnerToast.info(title, {
      description,
      duration: 3000,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  }
};

export default showToast;
