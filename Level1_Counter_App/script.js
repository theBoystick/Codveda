let count = 0;

const counterDisplay = document.getElementById("counter");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

function updateCounter() {
    counterDisplay.textContent = count;
}

incrementBtn.addEventListener("click", () => {
    count++;
    updateCounter();
});

decrementBtn.addEventListener("click", () => {
    if (count > 0) {
        count--;
        updateCounter();
    }
});

resetBtn.addEventListener("click", () => {
    count = 0;
    updateCounter();
});