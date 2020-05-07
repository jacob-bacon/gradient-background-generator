function load() {

    let body = document.getElementById("gradientContainer");
    let color1 = document.querySelector(".color1");
    let color2 = document.querySelector(".color2");
    let direction = document.querySelector(".direction");
    let bgTextOutput = document.querySelector("h5");
    
    const pickerDiameter = 4;
    const pickerRadius = pickerDiameter / 2;
    let pickerPos = [0,0];
    let isMoving = false;

    const colorWheelCanvas = document.getElementById("colorWheel");
    const ctx = colorWheelCanvas.getContext("2d");
    const colorWheelImage = document.getElementById("colorWheelSrc");
    let canvasStartX = (colorWheelCanvas.getBoundingClientRect().left);
    let canvasStartY = (colorWheelCanvas.getBoundingClientRect().top);
    
    let initialColors = document.querySelectorAll(".swatch");
    let colorList = [];
    
    let bgStyleText = "";

    colorWheelImage.crossOrigin = "Anonymous";

    class Color {
        constructor(swatchId, coords, rgb) {
            this.swatchId = swatchId;
            this.coords = coords;
            this.rgb = rgb;
        };
    };

    
    //add event listeners
    colorWheelCanvas.addEventListener("mousedown", e => {
        e.preventDefault();
        isMoving = true;
        getPixelColor(drawColorWheel([e.clientX - canvasStartX, e.clientY - canvasStartY]));
    });

    colorWheelCanvas.addEventListener("mousemove", e => {
        if (isMoving === true) {
            e.preventDefault();
            getPixelColor(drawColorWheel([e.clientX - canvasStartX, e.clientY - canvasStartY]));
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

    pickerPos = drawColorWheel(randomCoords());

    initialColors.forEach(addColor);
    colorList.forEach(fillSwatch);

    function drawColorWheel(pickerCoords) {
        canvasStartX = (colorWheelCanvas.getBoundingClientRect().left);
        canvasStartY = (colorWheelCanvas.getBoundingClientRect().top);    
        
        ctx.clearRect(0, 0, colorWheelCanvas.width, colorWheelCanvas.height);
        ctx.drawImage(colorWheelImage, 0, 0, 204, 204, 0, 0, 204, 204);
        colorWheelImage.style.display = "none";
    
        ctx.beginPath();
        ctx.arc(pickerCoords[0] + pickerRadius, pickerCoords[1] + pickerRadius, pickerDiameter, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        getPixelColor(pickerPos);
        return pickerCoords;
    };

    function addColor(color) {
        let coords = randomCoords();
        colorList.push(new Color(color.id, coords, getPixelColor(coords)));
    }

    function fillSwatch(color) {
        document.getElementById(color.swatchId).style.background = `rgba(${(color.rgb).join()})`;
    };
    
    function getPixelColor(pickerCoords) {
        var pixelData = ctx.getImageData(pickerCoords[0], pickerCoords[1], 1, 1).data;
        return pixelData;
    };

    function updateBg(){
        bgStyleText = `linear-gradient(${direction.value}deg, ${color1.value}, ${color2.value})`;
        bgTextOutput.innerText = `background: ${bgStyleText};`;
        body.style.background = bgStyleText;
    };

    //for setting a random picker position on page load
    function randomCoords() {
        let x = Math.floor(Math.random() * (170 - 30 + 1) + 30);
        let y = Math.floor(Math.random() * (170 - 30 + 1) + 30);
        let xy = [x, y];
        return xy;
    };

    updateBg();
};

load();



