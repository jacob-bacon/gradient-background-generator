var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var direction = document.querySelector(".direction");
var bgTextOutput = document.querySelector("h5");
var body = document.querySelector("body");
var bgStyleText = "";

const canvas = document.getElementById('colorWheel');
const ctx = canvas.getContext('2d');

function drawColorWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const wheelOuterRadius = centerX - 5;
    const wheelInnerRadius = centerX - 35;
    const arcStartDeg = 0;
    const arcEndDeg = 2;
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    
    //outer wheel border
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelOuterRadius, arcStartDeg, arcEndDeg * Math.PI);
    ctx.stroke();

    //inner wheel border
    ctx.beginPath();
    ctx.arc(centerX, centerY, wheelInnerRadius, arcStartDeg, arcEndDeg * Math.PI);
    ctx.stroke();
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




