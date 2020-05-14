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
