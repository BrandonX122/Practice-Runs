// General Utility
function convertToMin(time) {
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);

    let m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let s = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${m} : ${s}`;
}

// =========================
// TIMER PAGE LOGIC
// =========================
const display = document.querySelector('.display-timer');
const buttons = document.querySelectorAll('.btn');

if (display && buttons.length > 0) {
    let [milseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    let timer = null;

    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (button.id === 'start-btn') {
                if (timer !== null) clearInterval(timer);
                timer = setInterval(updateTimer, 10);
            } else if (button.id === 'pause-btn') {
                clearInterval(timer);
            } else if (button.id === 'reset-btn') {
                clearInterval(timer);
                [milseconds, seconds, minutes, hours] = [0, 0, 0, 0];
                display.innerHTML = "00 : 00 : 00 : 000";
            }

            buttons.forEach((btn) => btn.classList.remove('pressed'));
            button.classList.add('pressed');
        });
    });

    function updateTimer() {
        milseconds += 10;
        if (milseconds === 1000) {
            milseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }

        let h = hours < 10 ? `0${hours}` : hours;
        let m = minutes < 10 ? `0${minutes}` : minutes;
        let s = seconds < 10 ? `0${seconds}` : seconds;
        let ms = milseconds < 10 ? `00${milseconds}` :
            milseconds < 100 ? `0${milseconds}` : milseconds;

        display.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
    }
}

// =========================
// POMODORO PAGE LOGIC
// =========================
const settingBtn = document.querySelector('#setting-btn');
const settingDisplay = document.querySelector('.settings');
const saveBtn = document.querySelector('#save-btn');
const pomodoroInput = document.querySelector('#pomodoro-input');
const shortInput = document.querySelector('#short-input');
const longInput = document.querySelector('#long-input');
const pomoDisplay = document.querySelector('.pomodoro-timer');
const pomoStartButton = document.querySelector('#p-start');
const pomoPauseButton = document.querySelector('#p-pause');
const pomoButtons = document.querySelectorAll('.p-btn');
const optionButtons = document.querySelectorAll('.option');

if (
    settingBtn && settingDisplay && saveBtn &&
    pomodoroInput && shortInput && longInput &&
    pomoDisplay && pomoStartButton && pomoPauseButton &&
    pomoButtons.length > 0 && optionButtons.length > 0
) {
    let currentOption = 'pomodoro';
    let pomoTimer = null;
    let timerDuration = null;

    let [pomoMinutes, shortMinutes, longMinutes] = [
        parseFloat(pomodoroInput.value),
        parseFloat(shortInput.value),
        parseFloat(longInput.value)
    ];

    optionButtons.forEach((button) => {
        button.addEventListener('click', (e) => {

            if (pomoTimer) {
                clearInterval(pomoTimer);
                pomoStartButton.disabled = false;
            }

            if (button.id === 'pomodoro-option') {
                currentOption = 'pomodoro';
                pomoDisplay.innerHTML = convertToMin(pomoMinutes);
            } else if (button.id === 'short-option') {
                currentOption = 'short';
                pomoDisplay.innerHTML = convertToMin(shortMinutes);
            } else if (button.id === 'long-option') {
                currentOption = 'long';
                pomoDisplay.innerHTML = convertToMin(longMinutes);
            }
        });
    });

    settingBtn.addEventListener('click', () => {
        settingDisplay.classList.add('show');
    });

    saveBtn.addEventListener('click', () => {
        pomoMinutes = parseFloat(pomodoroInput.value);
        shortMinutes = parseFloat(shortInput.value);
        longMinutes = parseFloat(longInput.value);

        if (currentOption === 'pomodoro') {
            pomoDisplay.innerHTML = convertToMin(pomoMinutes);
        } else if (currentOption === 'short') {
            pomoDisplay.innerHTML = convertToMin(shortMinutes);
        } else if (currentOption === 'long') {
            pomoDisplay.innerHTML = convertToMin(longMinutes);
        }

        settingDisplay.classList.remove('show');
    });

    pomoButtons.forEach((p_button) => {
        p_button.addEventListener('click', () => {
            if (p_button.id === 'p-start') {
                if (pomoTimer) clearInterval(pomoTimer);

                const timerMin = parseInt(pomoDisplay.innerHTML.split(":")[0]);
                const timerSec = parseInt(pomoDisplay.innerHTML.split(":")[1]);
                timerDuration = (((timerSec / 60) + timerMin) * 60);

                pomoTimer = setInterval(updatePomodoro, 1000);
                pomoStartButton.disabled = true;
                pomoStartButton.classList.add('pressed');
                pomoPauseButtonclassList.remove('pressed');
            } else if (p_button.id === 'p-pause') {
                clearInterval(pomoTimer);
                pomoStartButton.disabled = false;
                pomoStartButton.classList.remove('pressed');
                pomoPauseButton.add('pressed');
            }
        });
    });

    function updatePomodoro() {
        timerDuration--;

        if (timerDuration < 0) {
            clearInterval(pomoTimer);
            pomoDisplay.innerHTML = "00 : 00";
            pomoStartButton.disabled = false;
        } else {
            let value = timerDuration / 60;
            pomoDisplay.innerHTML = `${convertToMin(value)}`
        }
    }
}
