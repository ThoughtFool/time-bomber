document.querySelector("body").addEventListener("mousemove", buttonFollower);

function buttonFollower(e) {
    const enterBtn = document.querySelector(".enter-btn");
    const BtnCoords = enterBtn.getBoundingClientRect();

    // let xPos = BtnCoords.left + BtnCoords.width / 2;
    // let yPos = BtnCoords.top + BtnCoords.height / 2;

    const offset = BtnCoords.width / 2;

    enterBtn.style.left = `${e.pageX - offset}px`;
    enterBtn.style.top = `${e.pageY - offset}px`;
};
