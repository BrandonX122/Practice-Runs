const body = document.querySelector('body');
const greenButton = document.querySelector('#green');
const randomButton = document.querySelector('#random');
const saveButton = document.querySelector('#savebtn');
const savedColors = document.querySelector('ul');


greenButton.addEventListener('click', (e) => {
    setColor('green');
});

randomButton.addEventListener('click', (e) => {
    randomColor();
})

saveButton.addEventListener('click', (e) => {
    saveColor();
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

function saveColor() {
    const currentColor = body.style.backgroundColor;
    console.log(currentColor);
    const button = document.createElement('button');
    button.style.backgroundColor = currentColor;
    button.addEventListener('click', (e) => {
        setColor(currentColor);
    })
    savedColors.appendChild(button);
}

