
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

  document.querySelector('.rock-button').addEventListener('click', () => {
    
  })
  
  let isAutoPlaying = false;
  let intervalId;

  function autoPlay(PlayerMove) {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      addSelectedClass(document.getElementById('auto-play-button'));
      intervalId = setInterval(() => {
        PlayGame(PlayerMove);
      }, 1000)
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
    } else {
      console.log("it's fucked");
    }

    console.log(typeof PlayerMove);
    console.log(PlayerMove);
  }

  const smallMovePolygons = document.querySelectorAll('.small-multigame-polygon');

  // Add a click event listener to each element
  smallMovePolygons.forEach(polygon => {
    polygon.addEventListener('click', () => {
      // Remove the 'selected' class from all polygons
      smallMovePolygons.forEach(p => {
        p.classList.remove('selected');
      });
      // Add the 'selected' class to the clicked polygon
      polygon.classList.add('selected');
    });
  });

  function addSelectedClass(item) {
    item.classList.add('selected');
  }

  function removeSelectedClass(item) {
    item.classList.remove('selected');
  }
