import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";

export const msgSuccess = (message) => {
  toast.success(message);
};

export const msgError = (msg) => {
  toast.error(msg);
};

export const msgConfirm = (msg, func) => {
  swal({
    title: `Are you sure?`,
    text: msg,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      func();
    }
  });
};

export const msgInfo = (msgTitle, msg, func) => {
  swal({
    title: msgTitle,
    text: msg,
    icon: "info",
    buttons: true,
  }).then((res) => {
    if (res) {
      func();
    }
  });
};
