
var result = '';
let score = JSON.parse(localStorage.getItem('score')) || {Win: 0, Lose: 0, Tie: 0};

updateResultElement();
updateMoveElement();
updateRecordElement();

  function PlayGame(PlayerMove) {

    var ComputerMove = PickComputerMove();
    result = '';

    const outcomes = {
      Rock: {
        Rock: 'Tie',
        Paper: 'Lose',
        Scissors: 'Win'
      },
      Paper: {
        Rock: 'Win',
        Paper: 'Tie',
        Scissors: 'Lose'
      },
      Scissors: {
        Rock: 'Lose',
        Paper: 'Win',
        Scissors: 'Tie'
      }
    };

    result = outcomes[PlayerMove][ComputerMove];

    score[result]++;

    localStorage.setItem('score', JSON.stringify(score));

    updateResultElement(result);
    updateMoveElement(PlayerMove, ComputerMove);
    updateRecordElement();
  }

  const smallMovePolygons = document.querySelectorAll('.small-multigame-polygon');
  
  // main functionality, using event listeners. vv
  document.addEventListener('click', (event) => {
    if (event.target === document.getElementById('multigame-play-button') || event.target === document.getElementById('multigame-play-text')) {
      PlayMultipleGames(PlayerMove);
      isItFucked(PlayerMove);
      console.log(PlayerMove);
    }
    if (event.target === document.getElementById('clear-button') || event.target === document.getElementById('clear-text')) {
      clearMultipleGamesField();
      addSelectedClass(document.getElementById('clear-button'));
      smallMovePolygons.forEach(p => {
        p.classList.remove('selected');
      });
      setTimeout(() => {
        removeSelectedClass(document.getElementById('clear-button'));
      }, 1000);
    }
    if (event.target === document.getElementById('auto-play-button') || event.target === document.getElementById('auto-play-text')) {
      autoPlay(PlayerMove);
      isItFucked(PlayerMove);
    }
    if (event.target === document.getElementById('reset-button')) {
      ResetScore();
    }
    
    if (event.target === document.getElementById('multigame-rock') || event.target === document.getElementById('multigame-rock-icon') || event.target.parentElement.id === 'multigame-rock-icon') {
      PlayerMove = 'Rock';
    }
    
    if (event.target === document.getElementById('multigame-paper') || event.target === document.getElementById('multigame-paper-icon') || event.target.parentElement.id === 'multigame-paper-icon') {
      PlayerMove = 'Paper';
    }
    
    if (event.target === document.getElementById('multigame-scissors') || event.target === document.getElementById('multigame-scissors-icon') || event.target.parentElement.id === 'multigame-scissors-icon') {
      PlayerMove = 'Scissors';
    }

    if (event.target.classList.contains('small-multigame-polygon')) {
      smallMovePolygons.forEach(p => {
        p.classList.remove('selected');
      });
      event.target.classList.add('selected');
    }
  });

  function addMoveClickListener(moveType) {
    document.getElementById(`${moveType.toLowerCase()}-button`).addEventListener('click', () => {
      PlayGame(moveType);
    });
  }
  
  addMoveClickListener('Rock');
  addMoveClickListener('Paper');
  addMoveClickListener('Scissors');

  // here we play the game using the keyboard. vv
  document.addEventListener('keydown', (event) => {
    const inputElement = document.getElementById('multiple-games-input');
  
    if (event.shiftKey) { 
      if (event.shiftKey && event.key === 'R') {
        PlayerMove = 'Rock';
        addSelectedClass(document.getElementById('multigame-rock'));
      } 
      if (event.shiftKey && event.key === 'P') {
        PlayerMove = 'Paper';
        addSelectedClass(document.getElementById('multigame-paper'));
      } 
      if (event.shiftKey && event.key === 'S') {
        PlayerMove = 'Scissors';
        addSelectedClass(document.getElementById('multigame-scissors'));
      }
    }

    else if (!event.shiftKey) {
      if (event.key === 'r') {
        PlayGame('Rock');
      }
      if (event.key === 'p') {
        PlayGame('Paper');
      }
      if (event.key === 's') {
        PlayGame('Scissors');
      }
      if (event.key >= '0' && event.key <= '9' && document.activeElement !== inputElement) {
        const number = event.key;
        inputElement.value += number;
      }
      if (event.key === 'Backspace' && document.activeElement !== inputElement) {
        inputElement.value = inputElement.value.slice(0, -1);
      }
    }

    if (event.key === 'Enter') {
      PlayMultipleGames(PlayerMove);
      isItFucked(PlayerMove);
      console.log(PlayerMove);
    }

    if (event.key === 'c' || event.key === 'C') {
      clearMultipleGamesField();
      addSelectedClass(document.getElementById('clear-button'));
      smallMovePolygons.forEach(p => {
        p.classList.remove('selected');
      });
      setTimeout(() => {
        removeSelectedClass(document.getElementById('clear-button'));
      }, 1000);
    }

    if (event.key === 'a' || event.key === 'A') {
      autoPlay(PlayerMove);
      isItFucked(PlayerMove);
    }
  });

  function addSelectedClass(item) {
    item.classList.add('selected');
  }

  function removeSelectedClass(item) {
    item.classList.remove('selected');
  }

  let isAutoPlaying = false;
  let intervalId;

  function autoPlay(PlayerMove) {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      addSelectedClass(document.getElementById('auto-play-button'));
      intervalId = setInterval(() => {
        PlayGame(PlayerMove);
      }, 500)
    }
    else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      removeSelectedClass(document.getElementById('auto-play-button'));
    }
  }

  function updateResultElement() {
    result ?
    document.querySelector('.result').innerHTML = `You ${result}`:
    document.querySelector('.result').innerHTML = `Make a move!`;
  } 

  function updateMoveElement(PlayerMove, ComputerMove) {
    document.querySelector('.moves').innerHTML = 
      (PlayerMove && ComputerMove) ? 
      `Moves: <img src="../images/${PlayerMove}-emoji.png" class="move-icon"> vs. 
      <img src="../images/${ComputerMove}-emoji.png" class="move-icon">` : 
      ``;
  }

  function updateRecordElement() {
   document.querySelector('.record').innerHTML = `Record: Wins: ${score.Win}, Losses: ${score.Lose}, Ties: ${score.Tie}`;
  }

  function PickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    switch (true) {
      case randomNumber > 2/3:
        computerMove = 'Rock';
        break;
      case randomNumber > 1/3:
        computerMove = 'Paper';
        break;
      default:
        computerMove = 'Scissors';
    }

    return computerMove;
  }

  function PlayMultipleGames(PlayerMove) {
    const InputElement = document.getElementById('multiple-games-input');
    const AmountOfGames = InputElement.value;
  
    for (let i = 0; i < AmountOfGames; i++) {
      ((index) => {
        setTimeout(() => {
          PlayGame(PlayerMove, () => {
            updateRecordElement(); 
            console.log(i);
          });
          console.log(i);
          console.log(index);
          if (index + 1 === AmountOfGames) {
            removeSelectedClass(document.getElementById('multigame-play-button'));
          }
        }, 100 * index);
      })(i);
    }
  };
  
  function clearMultipleGamesField() {
    document.querySelector('#multiple-games-input').value = '';
    PlayerMove = '';
  }

  function ResetScore() {
    score.Win = 0;
    score.Lose = 0;
    score.Tie = 0;
    localStorage.removeItem('score');
    updateResultElement();
    updateMoveElement();
    updateRecordElement();
  }

  let PlayerMove = '';

  function isItFucked(PlayerMove) {
    console.log(typeof PlayerMove);
    console.log(PlayerMove);

    if (['Rock', 'Paper', 'Scissors'].includes(PlayerMove)) {
      console.log('surely maybe not completely fucked');
    } 
    else {
      console.log("it's fucked");
    }
    console.log(typeof PlayerMove);
    console.log(PlayerMove);
  }

  // animation that doesn't work
  document.addEventListener('DOMContentLoaded', async () => {
    const filter = document.getElementById('glow');
    let deviation = 3;
    setInterval(() => {
      deviation = (deviation === 3) ? 10 : 3; 
      filter.setAttribute('stdDeviation', deviation); 
    }, 2000);
  });