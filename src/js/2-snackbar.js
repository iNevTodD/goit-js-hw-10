import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector("input[type='number'][name='delay']");

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const delay = Number(delayInput.value);
    if (delay < 0) {
        iziToast.error({
            title: 'Error',
            message: 'Delay value cannot be negative',
        });
        return;
    }

    const selectedRadio = document.querySelector("input[name='state']:checked");

    if (!selectedRadio) {
        iziToast.error({
            title: 'Error',
            message: 'Please select a state for the promise',
        });
        return;
    }

    const promise = new Promise((resolve, reject) => {
        const choosedOption = selectedRadio.value;
        delayInput.value = "";

        setTimeout(() => {
            if (choosedOption === "fulfilled") {
                resolve(delay);
            } else if (choosedOption === "rejected") {
                reject(delay);
            }

        }, delay);
    })

    promise.then(value => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${value}ms`,
        });

    }).catch((error) => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${error}ms`,
        });
    });

});
