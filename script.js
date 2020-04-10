let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let direction = document.querySelector(".direction");
let bgTextOutput = document.querySelector("h5");
let body = document.querySelector("body");
let bgStyleText = "";

const wheel = document.getElementById("colorWheel");
const bar = document.getElementById("colorBar");
const colorPicker1 = document.getElementById("pickerDot1");
const colorPicker2 = document.getElementById("pickerDot2");
const barPicker = document.getElementById("barDot");

//get the position and dimensions of the color wheel and bar
let wheelBounds = wheel.getBoundingClientRect();
let barBounds = bar.getBoundingClientRect();
let isMoving = false;
let x = 0;
let y = 0;

//add event listeners for color picker mousedown, mousemove, mouseup
let pickerArray = [colorPicker1, colorPicker2];

for (let i = 0; i < pickerArray.length; i++) {
    pickerArray[i].addEventListener('mousedown', e => {
        x = e.clientX - wheelBounds.left;
        y = e.clientY - wheelBounds.top;
        isMoving = true;
    });

    pickerArray[i].addEventListener('mousemove', e => {
        if (isMoving === true) {
            movePicker(e, x, y, e.clientX - wheelBounds.left, e.clientY - wheelBounds.top);
            x = e.clientX - wheelBounds.left;
            y = e.clientY - wheelBounds.top;
        };
    });
};

window.addEventListener('mouseup', e => {
    if (isMoving === true) {
        movePicker(e, x, y, e.clientX - wheelBounds.left, e.clientY - wheelBounds.top);
        x = 0;
        y = 0;
        isMoving = false;
    };
});

function movePicker(pickerDot, x1, y1, x2, y2) {
    pickerDot.preventDefault();
    console.log(pickerDot);
    pickerDot.style.left = x2 + "px";
    pickerDot.style.top = y2 + "px";
    console.log(`x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`);
}

function fillColorWheel(colors) {
    let radius = wheel.offsetWidth / 2;
    let degreeStep = 270.225 / colors.length;
    let rotation = 0;
    let wheelBgStyleText = "";

    //for determining the center points for the gradients along the edge of the color wheel:
    //where d = the angle of rotation
    //and r = the radius of the wheel
    //and x,y = the thing we want to know
    //x = (r * cos(d))
    //y = (r * sin(d))
    //subtract all of that from the radius because (0,0) is at the top left corner, not the center of the div

    for (let i = 0; i < colors.length; i++) {
        let colorCoordX = radius - (radius * (Math.cos(rotation)));
        let colorCoordY = radius - (radius * (Math.sin(rotation)));
        let color = colors[i][0];

        wheelBgStyleText = wheelBgStyleText + `radial-gradient(circle at 
            ${colorCoordX}px ${colorCoordY}px, ${color} 2%, transparent 40%),`;
        
        rotation = rotation + degreeStep;
    }

    wheelBgStyleText = wheelBgStyleText.replace(/.$/,"");
    wheel.style.background = wheelBgStyleText;
}


function updateBg(){
    bgStyleText = `linear-gradient(${direction.value}deg, ${color1.value}, ${color2.value})`;
    bgTextOutput.innerText = `background: ${bgStyleText};`;
    body.style.background = bgStyleText;
};

updateBg();
fillColorWheel([['red'], ['orange'], ['yellow'], ['green'], ['blue'], ['indigo'], ['violet']]);

color1.addEventListener("input", updateBg);
color2.addEventListener("input", updateBg);
direction.addEventListener("input", updateBg);