import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("[data-start]");
startBtn.disabled = true;
let userSelectedDate;

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= new Date().getTime()) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            startBtn.disabled = true;
            startBtn.classList.remove("active");
        } else {
            startBtn.disabled = false;
            startBtn.classList.add("active");
            userSelectedDate = selectedDates[0];
        }
    },
};


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const daysPrev = document.querySelector("[data-days]");
const hoursPrev = document.querySelector("[data-hours]");
const minutesPrev = document.querySelector("[data-minutes]");
const secondsPrev = document.querySelector("[data-seconds]");

const datePicker = document.querySelector("#datetime-picker");

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    startBtn.classList.remove("active");


    const timerId = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = userSelectedDate.getTime() - currentTime;

        if (timeDifference <= 0) {
            clearInterval(timerId);
            datePicker.disabled = false;
            startBtn.disabled = true;
            startBtn.classList.remove("active");
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        daysPrev.textContent = addLeadingZero(days);
        hoursPrev.textContent = addLeadingZero(hours);
        minutesPrev.textContent = addLeadingZero(minutes);
        secondsPrev.textContent = addLeadingZero(seconds);
    }, 1000);

    datePicker.disabled = true;

});

flatpickr("#datetime-picker", options);
