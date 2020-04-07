let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let direction = document.querySelector(".direction");
let bgTextOutput = document.querySelector("h5");
let body = document.querySelector("body");
let bgStyleText = "";


function fillColorWheel(colors) {
    const wheel = document.getElementById('colorWheel');
    const radius = wheel.offsetWidth / 2;
    const degreeStep = 360 / colors.length;
    let rotation = degreeStep;
    let wheelBgStyleText = "";

    for (let i = 0; i < colors.length; i++) {
        let colorCoordX = radius - (radius * (Math.cos(rotation)));
        let colorCoordY = radius - (radius * (Math.sin(rotation)));
        let color = colors[i][0];
        wheelBgStyleText = wheelBgStyleText + `radial-gradient(circle at 
            ${colorCoordX}px ${colorCoordY}px, ${color} 50%, transparent),`;
        
        rotation = rotation + degreeStep;
    }
    wheelBgStyleText = wheelBgStyleText.replace(/.$/,";");
    console.log(wheelBgStyleText);
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




//for finding the center points for the gradients along the edge of the color wheel:
//where d = the angle of rotation
//and r = the radius of the wheel
//and x,y = the thing we want to know
//x = (r * cos(d))
//y = (r * sin(d))

//there are 7 colors, so to get d, we need to divide the circle by 7 (360/7 = 51.42857142857143)
//this needs to increase by d for each point we plot
//the radius of the circle needs to be determined by the width of the div/2