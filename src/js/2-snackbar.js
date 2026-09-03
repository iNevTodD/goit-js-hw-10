import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector(".form-input");

let delay = 0;

delayInput.addEventListener("input", (event) => {
    delay = Number(event.target.value);
});

const createButton = document.querySelector(".submit-btn");

createButton.addEventListener("click", (event) => {
    event.preventDefault();
    delayInput.value = "";
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
