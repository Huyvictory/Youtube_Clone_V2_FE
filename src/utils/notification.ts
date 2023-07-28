import { toast } from 'react-toastify';

import { toastOptions } from '@/constants/index';

export function showNotification(messsage: string, type: string, duration?: number) {
  switch (type) {
    case 'success':
      return toast.success(messsage, {
        ...toastOptions,
        autoClose: duration ? duration : false,
      });
    case 'warning':
      return toast.warning(messsage, {
        ...toastOptions,
        autoClose: duration ? duration : false,
      });
    case 'error':
      return toast.error(messsage, {
        ...toastOptions,
        autoClose: duration ? duration : false,
      });
    default:
      return toast.info(messsage, {
        ...toastOptions,
        autoClose: duration ? duration : false,
      });
  }
}
