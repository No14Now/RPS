
var result = '';
const score = JSON.parse(localStorage.getItem('score')) || {Wins: 0, Losses: 0, Ties: 0};

updateResultElement();
updateMoveElement();
updateRecordElement();

function PlayGame(PlayerMove) {

  var ComputerMove = PickComputerMove();
  result = '';

  if (PlayerMove === 'Rock') {

    if (ComputerMove === 'Rock') {
      result = 'Tie';
    }
    else if (ComputerMove === 'Paper') {
      result = 'Lose';
    }
    else {
      result = 'Win';
    }
  }

  else if (PlayerMove === 'Paper') {
    if (ComputerMove === 'Rock') {
      result = 'Win';
    }
    else if (ComputerMove === 'Paper') {
      result = 'Tie';
    }
    else {
      result = 'Lose';
    }
  
  }

  else if (PlayerMove === 'Scissors') {
    if (ComputerMove === 'Rock') {
      result = 'Lose';
    }
    else if (ComputerMove === 'Paper') {
      result = 'Win';
    }
    else {
      result = 'Tie';
    }
  }

  if (result === 'Win') {
    score.Wins++;
  }
  else if (result === 'Lose') {
    score.Losses++;
  }
  else if (result === 'Tie') {
    score.Ties++;
  }
    

  localStorage.setItem('score', JSON.stringify(score));

  updateResultElement();
  updateMoveElement(PlayerMove, ComputerMove);
  updateRecordElement();

}

  function updateResultElement() {
    result !== '' ?
    document.querySelector('.result').innerHTML = `You ${result}`:
    document.querySelector('.result').innerHTML = `Make a move!`;
  } 
  function updateMoveElement(PlayerMove, ComputerMove) {
    PlayerMove !== undefined && ComputerMove !== undefined ?
    document.querySelector('.moves').innerHTML = `
    Moves: <img src="/javascript-course/website/images/${PlayerMove}-emoji.png" class="move-icon"> vs. 
    <img src="/javascript-course/website/images/${ComputerMove}-emoji.png" class="move-icon">`:
    document.querySelector('.moves').innerHTML = ``;
  } 
  function updateRecordElement() {
   document.querySelector('.record').innerHTML = `Record: Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
  }

function PickComputerMove() {
  const RandomNumber = Math.random();
  let ComputerMove = '';

  if (RandomNumber > 2/3) {
    ComputerMove = ('Rock');
  } 
  else if (RandomNumber > 1/3 && RandomNumber < 2/3) {
    ComputerMove = ('Paper');
  }
  else {
    ComputerMove = ('Scissors');
  }

  return ComputerMove;
}

function PlayMultipleGames(PlayerMove) {
  const InputElement = document.getElementById('multiple-games-input');
  const AmountOfGames = InputElement.value;
  for (let i = 0; i < AmountOfGames; i++) {
    PlayGame(PlayerMove);
  }
}

function clearMultipleGamesField() {
  document.querySelector('#multiple-games-input').value = '';
  PlayerMove = '';
}

function ResetScore() {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateResultElement();
  updateMoveElement();
  updateRecordElement();
}

let PlayerMove = '';

function isItFucked(PlayerMove) {
  console.log(typeof PlayerMove);
  console.log(PlayerMove);
  if (PlayerMove !== 'Rock' && PlayerMove !== 'Paper' && PlayerMove !== 'Scissors') {
    console.log('it\'s fucked');
}
  else if (PlayerMove === 'Rock' || PlayerMove === 'Paper' || PlayerMove === 'Scissors') {
    console.log('surely maybe not completely fucked');
  }
  else {
    console.log('???????????????????????');
  }
  console.log(typeof PlayerMove);
  console.log(PlayerMove);
}
