const body = document.querySelector('body');
const greenButton = document.querySelector('#green');
const randomButton = document.querySelector('#random');

greenButton.addEventListener('click', (e) => {
    setColor('green');
});

randomButton.addEventListener('click', (e) => {
    randomColor();
})
//Or Add onClick onto the html element button and simply call
//the function setColot from there
function setColor(name) {
    body.style.backgroundColor = name;
}

function randomColor() {
    const red = Math.round(Math.random() * 255);
    const blue = Math.round(Math.random() * 255);
    const green = Math.round(Math.random() * 255);
    const color = `rgb(${red},${blue},${green})`
    body.style.backgroundColor = color;
}

//Add random event from body onto text colors
//Improve UI
//Move Components Around?
