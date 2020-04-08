let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let direction = document.querySelector(".direction");
let bgTextOutput = document.querySelector("h5");
let body = document.querySelector("body");
let bgStyleText = "";


function fillColorWheel(colors) {
    let wheel = document.getElementById("colorWheel");
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