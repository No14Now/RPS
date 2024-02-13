
let CalculatorCount = localStorage.getItem('CalculatorCount') || '';

function UpdateCalculation(CalculatorInput) {
  CalculatorCount += CalculatorInput;
  document.querySelector('.calculation').innerHTML = CalculatorCount;
  console.log(CalculatorCount);
  localStorage.setItem('CalculatorCount', CalculatorCount);
}
UpdateCalculation('');
