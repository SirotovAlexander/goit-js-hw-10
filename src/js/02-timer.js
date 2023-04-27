import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }
  },
  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      startBtn.removeAttribute('disabled');
    } else {
      startBtn.setAttribute('disabled', 'disabled');
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', onClick);

function onClick(event) {
  startBtn.disabled = true;
  const intervalId = setInterval(() => {
    const targetDate = new Date(input.value);
    const timer = targetDate - Date.now();
    const convertTimer = convertMs(timer);
    days.textContent = addLeadingZero(convertTimer.days);
    hour.textContent = addLeadingZero(convertTimer.hours);
    minutes.textContent = addLeadingZero(convertTimer.minutes);
    seconds.textContent = addLeadingZero(convertTimer.seconds);
    if (timer <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);

  startBtn.setAttribute('disabled', 'disabled');
  input.setAttribute('disabled', 'disabled');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
