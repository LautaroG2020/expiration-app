import Swal from "sweetalert2";

export const NotifyOk = (title, message, callback = null) => {
    Swal.fire({
        title: title,
        text: message,
        icon: "success",
    }).then((result) => {
        if (callback) {
            callback(result);
        }
    });
};

export const NotifyError = (message, callback = null) => {
    Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
    }).then((result) => {
        if (callback) {
            callback(result);
        }
    });
};