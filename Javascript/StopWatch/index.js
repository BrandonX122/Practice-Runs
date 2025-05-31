const display = document.querySelector('.display-timer');
const buttons = document.querySelectorAll('.btn');
const settingBtn = document.querySelector('#setting-btn');
const settingDisplay = document.querySelector('.settings');
const saveBtn = document.querySelector('#save-btn');
const pomoButtons = document.querySelectorAll('.p-btn');
const pomodoroInput = document.querySelector('#pomodoro-input');
const shortInput = document.querySelector('#short-input');
const longInput = document.querySelector('#long-input');
const pomoDisplay = document.querySelector('.pomodoro-timer');
let [milseconds, seconds, minutes, hours] = [0,0,0,0];
let [pomoMinutes, shortMinutes, longMinutes] = [
    pomodoroInput.value, shortInput.value, longInput.value    
]
let timerDuration = null;
let timer = null;
let pomoTimer = null;

//POMODORO
settingBtn.addEventListener('click', (e) => {
    settingDisplay.classList.add('show');
})

saveBtn.addEventListener('click', (e) => {
    pomoMinutes = pomodoroInput.value;
    // shortMinutes = shortInput.value;
    // longMinutes = longInput.value;

    const pm = convertToMin(pomoMinutes);
    // const sm = convertToMin(shortMinutes);
    // const lm = convertToMin(longMinutes);

    pomoDisplay.innerHTML = pm;

    settingDisplay.classList.remove('show');
})

pomoButtons.forEach((p_button) => {
    p_button.addEventListener('click', (e) => {
        if(p_button.id === 'p-start') {
            if(pomoTimer) {
                clearInterval(pomoTimer);
            }
            const timerMin = parseInt(pomoDisplay.innerHTML.split(":")[0]);
            const timerSec = parseInt(pomoDisplay.innerHTML.split(":")[1]);
            timerDuration = (((timerSec / 60) + timerMin) * 60);

            pomoTimer = setInterval(updatePomodoro, 1000);
            document.querySelector('#p-start').disabled = true;
        } else if(p_button.id === 'p-pause') {
            clearInterval(pomoTimer);
            document.querySelector('#p-start').disabled = false;
        }
    })
});

function updatePomodoro () {
    timerDuration--;

    if(timerDuration < 0) {
        clearInterval(pomoTimer);
        pomoDisplay.innerHTML = "00 : 00";
        document.querySelector('#p-start').disabled = false;
    } else {
        let value = timerDuration / 60;
        pomoDisplay.innerHTML = `${convertToMin(value)}`
    }

}

function convertToMin(time) {
    const minutes = Math.floor(time);
    const seconds = Math.round((time - minutes) * 60);

    let m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let s = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${m} : ${s}`;
}


//TIMER
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(button.id === 'start-btn'){
            if(timer !== null) {
                clearInterval(timer); //stops repeating the setinterval call to function to update
                //prevents multiple calls to the update function after already clicking Start
            }
            timer = setInterval(updateTimer, 10); //after clicking start, updateTimer will be called every 10 millisecond
        } else if(button.id === 'pause-btn') {
            clearInterval(timer); 
        } else if(button.id === 'reset-btn') {
            clearInterval(timer);
            [milseconds, seconds, minutes, hours] = [0,0,0,0];
            display.innerHTML = "00 : 00 : 00 : 000";
        }

        buttons.forEach((btn) => {
            btn.classList.remove('pressed');
        });
        //Apply pressed classed only onto currently pressed buttons
        button.classList.add('pressed');
    }) 
});


function updateTimer() {
    milseconds += 10;
    if(milseconds === 1000) {
        milseconds = 0;
        seconds++;
        if(seconds === 60) {
            seconds = 0;
            minutes++;
            if(minutes === 60) {
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
