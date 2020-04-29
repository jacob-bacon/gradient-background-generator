let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let direction = document.querySelector(".direction");
let bgTextOutput = document.querySelector("h5");
let body = document.getElementById("gradientContainer");
let bgStyleText = "";

const wheel = document.getElementById("colorWheel");
let radius = wheel.offsetWidth / 2;
let wheelCenterX = (wheel.getBoundingClientRect().left) + radius;
let wheelCenterY = (wheel.getBoundingClientRect().top) + radius;

const bar = document.getElementById("colorBar");
const colorPicker1 = document.getElementById("pickerDot1");
const colorPicker2 = document.getElementById("pickerDot2");
const barPicker = document.getElementById("barDot");

let activePicker = document.querySelector(".activePickerDot");
let isMoving = false;

//add mousedown, mousemove, mouseup event listeners to all pickers
let pickerArray = [colorPicker1, colorPicker2, barPicker];

for (let i = 0; i < pickerArray.length; i++){
    pickerArray[i].addEventListener('mousedown', e => {
        //check all pickers and remove '.activePickerDot' so only the one clicked is active
        for (let p = 0; p < pickerArray.length; p++) {
            if (pickerArray[p].classList.contains("activePickerDot")) {
                pickerArray[p].classList.remove("activePickerDot");
            }
        }

        activePicker = pickerArray[i];
        activePicker.classList.add("activePickerDot");
    });
};

let halfPickerWidth = activePicker.offsetWidth / 2;

wheel.onmousedown = function startMove(e) {
    e.preventDefault();
    isMoving = true;
    wheel.onmousemove = movePicker;
};

window.onmouseup = endMove;

function endMove() {
    isMoving = false;
};

function movePicker(e) {
    if (isMoving === true) {
        //use pythagorean theorem to find active picker's distance from wheel center
        let a = 0;
        let b = 0;

        //while wheel center is treated as (0,0), math operation changes based on whether picker
        //position is +/- x or +/- y
        if ((e.clientX >= wheelCenterX)) { 
            a = Math.pow((e.clientX - wheelCenterX), 2);
        } else {
            a = Math.pow((wheelCenterX - e.clientX), 2);
        };
        if ((e.clientY >= wheelCenterY)) { 
            b = Math.pow((e.clientY - wheelCenterY), 2);
        } else {
            b = Math.pow((wheelCenterY - e.clientY), 2);
        };

        let c = Math.sqrt(a + b);

        if (c <= radius) {
            activePicker.style.left = (e.clientX - halfPickerWidth) + "px";
            activePicker.style.top = (e.clientY - halfPickerWidth) + "px";
        }
    } else {
        return
    };
};

//filling the color wheel
function fillColorWheel(colors) {
    let degreeStep = 270.225 / colors.length;
    let rotation = 0;
    let wheelBgStyleText = "";

    //for determining the center points for the gradients along the edge of the color wheel:
    //where d = the angle of rotation
    //and r = the radius of the wheel
    //and x,y = the thing we want to know
    //x = (r * cos(d))
    //y = (r * sin(d))
    //because (0,0) is at the top left corner, not the center of the div:
    //x = radius - x; y = radius - y

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