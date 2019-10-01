document.addEventListener("click", function (e) {
    xPos = e.clientX;
    yPos = e.clientY;

    clockDrop = document.getElementById("clock");
    bomb = this.createElement("DIV");
    bomb.classList.add("bomb");
    container.append(bomb);

    bomb.style.left = xPos + "px";
    bomb.style.top = yPos + "px";
});