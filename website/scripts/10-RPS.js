
var result = '';
const score = JSON.parse(localStorage.getItem('score')) || {Wins: 0, Losses: 0, Ties: 0};

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

    updateResultElement();
    updateMoveElement(PlayerMove, ComputerMove);
    updateRecordElement();

  }
  let isAutoPlaying = false;
  let intervalId;

  function autoPlay(PlayerMove) {
    if (!isAutoPlaying) {
      isAutoPlaying = true;
      intervalId = setInterval(() => {
        PlayGame(PlayerMove);
      }, 1000)
    }
    else {
      clearInterval(intervalId);
      isAutoPlaying = false;
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
      console.log(i+1);
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
    
    if (['Rock', 'Paper', 'Scissors'].includes(PlayerMove)) {
      console.log('surely maybe not completely fucked');
    } else {
      console.log("it's fucked");
    }

    console.log(typeof PlayerMove);
    console.log(PlayerMove);
  }

  const smallMovePolygons = document.querySelectorAll('.small-move-polygon');

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