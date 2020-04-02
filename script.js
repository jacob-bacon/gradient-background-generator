var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var direction = document.querySelector(".direction");
var bgTextOutput = document.querySelector("h5");
var body = document.querySelector("body");
var bgStyleText = "";

function updateBg(){
    bgStyleText = `linear-gradient(${direction.value}deg, ${color1.value}, ${color2.value})`;
    bgTextOutput.innerText = `background: ${bgStyleText};`;
    body.style.background = bgStyleText;
};

updateBg();

color1.addEventListener("input", updateBg);
color2.addEventListener("input", updateBg);



