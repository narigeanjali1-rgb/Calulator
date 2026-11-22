const display = document.getElementById("display");
const result = document.getElementById("result");

function appendValue(value) {
    display.value += value;
    showPreview();
}

function clearDisplay() {
    display.value = "";
    result.textContent = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    showPreview();
}

function calculate() {
    try {
        const expression = display.value;

        if (!expression || !/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const answer = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(answer)) {
            throw new Error("Cannot divide by zero");
        }

        display.value = String(
            Number(answer.toFixed(10))
        );

        result.textContent = "Result: " + display.value;

    } catch {
        result.textContent = "Invalid Expression";
    }
}

function showPreview() {
    try {
        const expression = display.value;

        if (!expression || !/^[0-9+\-*/%.() ]+$/.test(expression)) {
            result.textContent = "";
            return;
        }

        const answer = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(answer)) {
            result.textContent = "";
            return;
        }

        result.textContent = "Preview: " +
            Number(answer.toFixed(10));

    } catch {
        result.textContent = "";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    if (/^[0-9.+\-*/%]$/.test(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});