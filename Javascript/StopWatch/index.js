const display = document.querySelector('.display-timer');
const buttons = document.querySelectorAll('.btn');
let [milseconds, seconds, minutes, hours] = [0,0,0,0];
//equal to setting multiple variable into a value.
let timer = null;

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
