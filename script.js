function load() {

    let body = document.getElementById("gradientContainer");
    let color1 = document.querySelector(".color1");
    let color2 = document.querySelector(".color2");
    let direction = document.querySelector(".direction");
    let bgTextOutput = document.querySelector("h5");
    
    const pickerDiameter = 4;
    const pickerRadius = pickerDiameter / 2;
    let pickerPos = [];
    let isMoving = false;

    const colorWheelCanvas = document.getElementById("colorWheel");
    const ctx = colorWheelCanvas.getContext("2d");
    const colorWheelImage = document.getElementById("colorWheelSrc");
    let canvasStartX = (colorWheelCanvas.getBoundingClientRect().left);
    let canvasStartY = (colorWheelCanvas.getBoundingClientRect().top);
    
    let initialColors = document.querySelectorAll(".swatch");
    let colorList = [];
    let activeSwatchContainer = (document.querySelectorAll(".activeSwatch"))[0];
    let activeSwatchId = activeSwatchContainer.childNodes[1].id;
    
    let bgStyleText = "";

    colorWheelImage.crossOrigin = "Anonymous";

    function Color(swatchId, coords, rgb) {
        this.swatchId = swatchId;
        this.coords = coords;
        this.rgb = rgb;
    };

    //add event listeners
    colorWheelCanvas.addEventListener("mousedown", e => {
        e.preventDefault();
        isMoving = true;
        updateColor(e, activeSwatchId);
    });

    colorWheelCanvas.addEventListener("mousemove", e => {
        if (isMoving === true) {
            e.preventDefault();
            updateColor(e, activeSwatchId);
        };
    });

    window.addEventListener("mouseup", e => {
        isMoving = false;
    });

    window.addEventListener("resize", e => {
        drawColorWheel(pickerPos);
    });

    color1.addEventListener("input", updateBg);
    color2.addEventListener("input", updateBg);
    direction.addEventListener("input", updateBg);

    drawColorWheel();
    initialColors.forEach(addColor);
    colorList.forEach(fillSwatch);

    function drawColorWheel(pickerCoords) {
        canvasStartX = (colorWheelCanvas.getBoundingClientRect().left);
        canvasStartY = (colorWheelCanvas.getBoundingClientRect().top);    
        
        ctx.clearRect(0, 0, colorWheelCanvas.width, colorWheelCanvas.height);
        ctx.drawImage(colorWheelImage, 0, 0, 204, 204, 0, 0, 204, 204);
        colorWheelImage.style.display = "none";
        
        if (pickerCoords !== undefined) {
            ctx.beginPath();
            ctx.arc(pickerCoords[0] + pickerRadius, pickerCoords[1] + pickerRadius, pickerDiameter, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.stroke();

            pickerPos = pickerCoords;
            getPixelColor(pickerCoords);
        }
        return pickerCoords;
    };

    function changeActiveSwatch(clickedSwatchContainer) {
        activeSwatchContainer.classList.remove("activeSwatch");
        clickedSwatchContainer.classList.add("activeSwatch");
        activeSwatchContainer = clickedSwatchContainer;
        activeSwatchId = activeSwatchContainer.childNodes[1].id;
        drawColorWheel((colorList[colorList.findIndex(color => color.swatchId === activeSwatchId)]).coords);
    }

    function addColor(swatch) {
        let coords = randomCoords();
        let color = new Color(swatch.id, coords, getPixelColor(coords));    
        colorList.push(color);

        if (activeSwatchId === swatch.id) {
            pickerPos = color.coords;
            drawColorWheel(color.coords);
        }

        swatch.parentNode.addEventListener("click", e => {
            changeActiveSwatch(swatch.parentNode);
        });
    }

    function fillSwatch(color) {
        document.getElementById(color.swatchId).style.background = `rgba(${(color.rgb).join()})`;
    };

    function updateColor(e, activeSwatchId) {
        let colorToUpdate = colorList[colorList.findIndex(color => color.swatchId === activeSwatchId)];
        colorToUpdate.coords = drawColorWheel([e.clientX - canvasStartX, e.clientY - canvasStartY]);
        colorToUpdate.rgb = getPixelColor(colorToUpdate.coords);

        fillSwatch(colorToUpdate);
    };
    
    function getPixelColor(pickerCoords) {
        var pixelData = ctx.getImageData(pickerCoords[0], pickerCoords[1], 1, 1).data;
        return pixelData;
    };

    function updateBg(){
        allSwatchColors = colorList.map(color => color.rgb);
        bgStyleText = `linear-gradient(${direction.value}deg, rgb(${allSwatchColors[0]}), rgb(${allSwatchColors[1]}))`;
        bgTextOutput.innerText = `background: ${bgStyleText};`;
        body.style.background = bgStyleText;
    };

    //for setting a random picker position for new colors
    function randomCoords() {
        let x = Math.floor(Math.random() * (170 - 30 + 1) + 30);
        let y = Math.floor(Math.random() * (170 - 30 + 1) + 30);
        let xy = [x, y];
        return xy;
    };

    updateBg();
};

load();



