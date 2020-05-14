class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = ''; //nothing showing or selected
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return; //stop from adding mult decimal points
    this.currentOperand = this.currentOperand.toString() + number.toString(); //append numbers
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return; //do not run if nothing there
    if(this.previousOperand !== ''){ //if we have a number there
      this.compute(); //run compute
    }
    this.operation = operation; //equal to operation we passed in
    this.previousOperand = this.currentOperand; //says we are done typing current number
    this.currentOperand = ''; //clear
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand); //turn prevOp string into actual number
    const current = parseFloat(this.currentOperand); //turn curOp string into actual number
    if(isNaN(prev) || isNaN(current)) return; //if nothing in prev or current do not return
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '&times;':
        computation = prev * current;
        break;
      case '&divide;':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation; //set text to our computed num
    this.operation = undefined; //reset operation
    this.previousOperand = ''; //clear prevOp
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => { //for each button in number buttons
  button.addEventListener('click', () => { //each time a button is clicked
    calculator.appendNumber(button.innerText); //append the number to text from HTML button text
    calculator.updateDisplay(); //run updateDisplay
  });
});

operationButtons.forEach(button => { //for each button in operand buttons
  button.addEventListener('click', () => { //each time a button is clicked
    calculator.chooseOperation(button.innerText); //run chooseOperation to use on innerText
    calculator.updateDisplay(); //run updateDisplay
  });
});


equalsButton.addEventListener('click', button => { //when I click '=' run compute and updateDisplay
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => { //when I click '=' run compute and updateDisplay
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => { //when I click '=' run compute and updateDisplay
  calculator.delete();
  calculator.updateDisplay();
});
