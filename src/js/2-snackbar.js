import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector("input[type='number'][name='delay']");

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    delayInput.value = "";
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
        let currentDelay = delay;
        setTimeout(() => {
            if (choosedOption === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${currentDelay}ms`);
            } else if (choosedOption === "rejected") {
                reject(`❌ Rejected promise in ${currentDelay}ms`);
            }

        }, currentDelay);
    })

    promise.then(value => {
        iziToast.success({
            title: 'Success',
            message: value,
        });

    }).catch((error) => {
        iziToast.error({
            title: 'Error',
            message: error,
        });
    });
});
