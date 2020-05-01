let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let direction = document.querySelector(".direction");
let bgTextOutput = document.querySelector("h5");
let body = document.getElementById("gradientContainer");
let bgStyleText = "";

const bar = document.getElementById("colorBar");
const barPicker = document.getElementById("barPicker");

function movePicker(e, wheelCenterX, wheelCenterY, radius, halfPickerWidth) {
    //use pythagorean theorem to find active picker"s distance from wheel center
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
        wheelPicker.style.left = (e.clientX - halfPickerWidth) + "px";
        wheelPicker.style.top = (e.clientY - halfPickerWidth) + "px";
    }
};


function drawColorWheel() {
    const colorWheelCanvas = document.getElementById("colorWheel");
    const ctx = colorWheelCanvas.getContext("2d");
    const colorWheelImage = document.getElementById("colorWheelSrc");
    const radius = colorWheelCanvas.offsetWidth / 2;
    const wheelCenterX = (colorWheelCanvas.getBoundingClientRect().left) + radius;
    const wheelCenterY = (colorWheelCanvas.getBoundingClientRect().top) + radius;
    const wheelPicker = document.getElementById("wheelPicker");
    let halfPickerWidth = wheelPicker.offsetWidth / 2;
    let isMoving = false;
    
    ctx.drawImage(colorWheelImage, 0, 0, 204, 204, 0, 0, 204, 204);
    colorWheelImage.style.display = "none";

    document.querySelectorAll(".moveable").forEach(item => {
        item.addEventListener("mousedown", e => {
            e.preventDefault();
            isMoving = true;
            movePicker(e, wheelCenterX, wheelCenterY, radius, halfPickerWidth);
        });
    });

    window.addEventListener("mouseup", e => {
        isMoving = false;
    });

    colorWheelCanvas.addEventListener("mousemove", e => {
        if (isMoving === true) {
            e.preventDefault();
            movePicker(e, wheelCenterX, wheelCenterY, radius, halfPickerWidth);
        };
    });
}

function updateBg(){
    bgStyleText = `linear-gradient(${direction.value}deg, ${color1.value}, ${color2.value})`;
    bgTextOutput.innerText = `background: ${bgStyleText};`;
    body.style.background = bgStyleText;
};

updateBg();
drawColorWheel();

color1.addEventListener("input", updateBg);
color2.addEventListener("input", updateBg);
direction.addEventListener("input", updateBg);