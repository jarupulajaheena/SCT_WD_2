const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");

let startTime = 0;
let elapsedTime = 0;
let timer = null;
let running = false;


// Format milliseconds into HH:MM:SS.mmm
function formatTime(time) {

    const milliseconds = time % 1000;

    const totalSeconds = Math.floor(time / 1000);

    const seconds = totalSeconds % 60;

    const totalMinutes = Math.floor(totalSeconds / 60);

    const minutes = totalMinutes % 60;

    const hours = Math.floor(totalMinutes / 60);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}


// Update stopwatch display
function updateDisplay() {

    const currentTime = Date.now();

    elapsedTime = currentTime - startTime;

    display.textContent = formatTime(elapsedTime);
}


// Start stopwatch
startBtn.addEventListener("click", function () {

    if (!running) {

        startTime = Date.now() - elapsedTime;

        timer = setInterval(updateDisplay, 10);

        running = true;
    }

});


// Pause stopwatch
pauseBtn.addEventListener("click", function () {

    if (running) {

        clearInterval(timer);

        elapsedTime = Date.now() - startTime;

        display.textContent = formatTime(elapsedTime);

        running = false;
    }

});


// Record lap
lapBtn.addEventListener("click", function () {

    if (!running && elapsedTime === 0) {
        return;
    }

    const lapItem = document.createElement("li");

    lapItem.textContent =
        "Lap " + (lapList.children.length + 1) +
        " — " + formatTime(elapsedTime);

    lapList.appendChild(lapItem);
});


// Reset stopwatch
resetBtn.addEventListener("click", function () {

    clearInterval(timer);
    

    startTime = 0;
    elapsedTime = 0;
    running = false;

    display.textContent = "00:00:00.000";

    lapList.innerHTML = "";
});

