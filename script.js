

function load() {
    let color1 = document.querySelector(".color1");
    let color2 = document.querySelector(".color2");
    let direction = document.querySelector(".direction");
    let bgTextOutput = document.querySelector("h5");
    let body = document.getElementById("gradientContainer");
    let bgStyleText = "";
    let isMoving = false;

    const colorWheelCanvas = document.getElementById("colorWheel");
    const ctx = colorWheelCanvas.getContext("2d");
    
    const colorWheelImage = document.getElementById("colorWheelSrc");
    colorWheelImage.crossOrigin = "Anonymous";

    let canvasStartX = (colorWheelCanvas.getBoundingClientRect().left);
    let canvasStartY = (colorWheelCanvas.getBoundingClientRect().top);
    const pickerDiameter = 4;
    const pickerRadius = pickerDiameter / 2;
    let pickerPos = [0,0];

    
    function drawColorWheel(pickerX, pickerY) {
        canvasStartX = (colorWheelCanvas.getBoundingClientRect().left);
        canvasStartY = (colorWheelCanvas.getBoundingClientRect().top);        
        
        ctx.clearRect(0, 0, colorWheelCanvas.width, colorWheelCanvas.height);
        ctx.drawImage(colorWheelImage, 0, 0, 204, 204, 0, 0, 204, 204);
        colorWheelImage.style.display = "none";
    
        ctx.beginPath();
        ctx.arc(pickerX + pickerRadius, pickerY + pickerRadius, pickerDiameter, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        pickerPos = [pickerX, pickerY];
        getPixelColor(pickerPos);
        return pickerPos;
    };
    
    function getPixelColor(pickerCoords) {
        var pixelData = ctx.getImageData(pickerCoords[0], pickerCoords[1], 1, 1).data;
        console.log(pixelData);
    };

    function updateBg(){
        bgStyleText = `linear-gradient(${direction.value}deg, ${color1.value}, ${color2.value})`;
        bgTextOutput.innerText = `background: ${bgStyleText};`;
        body.style.background = bgStyleText;
    };


    //add event listeners
    colorWheelCanvas.addEventListener("mousedown", e => {
        e.preventDefault();
        isMoving = true;
        getPixelColor(drawColorWheel(e.clientX - canvasStartX, e.clientY - canvasStartY));
    });

    colorWheelCanvas.addEventListener("mousemove", e => {
        if (isMoving === true) {
            e.preventDefault();
            getPixelColor(drawColorWheel(e.clientX - canvasStartX, e.clientY - canvasStartY));
        };
    });

    window.addEventListener("mouseup", e => {
        isMoving = false;
    });

    window.addEventListener("resize", e => {
        drawColorWheel(pickerPos[0], pickerPos[1]);
    });

    color1.addEventListener("input", updateBg);
    color2.addEventListener("input", updateBg);
    direction.addEventListener("input", updateBg);

    //for setting a random picker position on page load
    function randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    pickerPos = drawColorWheel(randomIntBetween(30, 170), randomIntBetween(30, 170));
    updateBg();
};

load();



