screen = document.querySelector("#screen");
expStack = ["0"];
const FIRST_VAL = 0;
const OPERATOR = 1;
const SECOND_VAL = 2;

function addDigit(digit) { 
    currentVal = expStack.length - 1;

    if (currentVal == OPERATOR) {
        expStack.push(digit);
        currentVal++;
    }

    else if (expStack[ currentVal ] == "0" && digit != ".")
        expStack[ currentVal ] = digit;
    else
        expStack[ currentVal ] += digit;

    screen.textContent = expStack[ currentVal ];
}

function clearScreen() {
    expStack = ["0"];
    screen.textContent = "0";
}

function setOperation(op) {
    if (expStack.length == 3)
        evalExpression();
    
    if (expStack.length == 1)
        expStack.push(op);
    else
        expStack[ expStack.length - 1 ] = op;
    console.log(expStack);
}

function negateSign() {
    currentVal = expStack.length - 1;

    if (currentVal != OPERATOR)
        expStack[ currentVal ] = String( -1 * parseFloat(expStack[ currentVal ]) );
    
    screen.textContent = expStack[ currentVal ];
}

function convertToPercent() {
    if (expStack.length == 3)
        evalExpression();

    currentVal = expStack.length - 1;
    if (currentVal != OPERATOR) {
        expStack[ currentVal ] = String( 0.01 * parseFloat(expStack[ currentVal ]) );
        console.log('hey');
    }
    screen.textContent = expStack[ currentVal ];
}

function evalExpression() {
    console.assert(expStack.length == 3, expStack);

    [firstValue, operator, secondValue] = expStack;
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);

    switch (operator) {
        case "/":
            if (secondValue != 0)
                screen.textContent = firstValue / secondValue;
            else
                screen.textContent = "ERROR";
            break;
        case "*":
            screen.textContent = firstValue * secondValue;
            break;
        case "-":
            screen.textContent = firstValue - secondValue;
            break;
        case "+":
            screen.textContent = firstValue + secondValue;
            break;
    }

    expStack = [screen.textContent];
}

numbers = document.querySelectorAll(".number");
symbols = document.querySelectorAll(".operator");
clearAll = document.querySelector("#clear-all");
changeSign = document.querySelector("#change-sign");
percent = document.querySelector("#percent");
equals = document.querySelector("#equals");

numbers.forEach( 
    (number) => number.addEventListener("click", () => addDigit(number.textContent) )
);

symbols.forEach(
    (symbol) => symbol.addEventListener("click", () => setOperation(symbol.textContent) )
);

clearAll.addEventListener("click", clearScreen);
changeSign.addEventListener("click", negateSign);
percent.addEventListener("click", convertToPercent);
equals.addEventListener("click", evalExpression);
