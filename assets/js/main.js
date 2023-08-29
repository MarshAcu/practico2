let player_score = 0;
let pc_score = 0;
const carts = ['Piedra', 'Papel', 'Tijera'];
const modal = document.getElementById('resultModal');
var span = document.getElementsByClassName("close")[0];

// boton jugar, validacion de input e inicializacion del juego
const nameValidation = () => {

    const playerName = document.getElementById('player').value;
    const gameOptions = document.getElementById('gameOptions');
    const playButton = document.getElementById('playButton');
    const resetButton = document.getElementById('resetButton');
    let score = document.getElementById('score');
    if(playerName.length > 0) {
        gameOptions.style.visibility = 'visible';
        playButton.style.display = 'none';
        resetButton.style.display = 'initial';
        score.innerHTML = `${playerName.toUpperCase()}: ${player_score} VS MAQUINA: ${pc_score}`;
    } else {
        console.error('No se ingreso ningun player name');
        window.alert('Ingrese el nombre de el jugador');
    }

}

// resetea todos los elementos del juego
const reset = () => {
    player_score = 0;
    pc_score = 0;
    const playButton = document.getElementById('playButton');
    const resetButton = document.getElementById('resetButton');
    document.getElementById('score').innerHTML = '';
    document.getElementById('player').value = '';
    document.getElementById('finalResult').innerHTML = '';
    let gameOptions = document.getElementById('gameOptions');
    gameOptions.style.visibility = 'hidden';
    playButton.style.display = 'initial';
    resetButton.style.display = 'none';
}

// evento de seleccion de una carta (piedra, papel o tijera)
const selectOption = (value) => {
    const randomMachinePlay = Math.floor(Math.random() * (3));
    const playerName = document.getElementById('player').value;
    const gameOptions = document.getElementById('gameOptions');
    let score = document.getElementById('score');
    document.getElementById('player_result').src = `assets/images/${carts[value]}.png`;
    document.getElementById('machine_result').src = `assets/images/${carts[randomMachinePlay]}.png`

    modal.style.display = 'block';
    // si son iguales se empata
    if( value == randomMachinePlay) {
        setResults('Empato', 'gray','Empato', 'gray');
        return;
    }
    // al mod le paso la diferencia entre la mano del player(value) y la mano de la maquina, y la cantidad de opciones de seleccion disponibles (3)
   if(mod(value - randomMachinePlay, carts.length) < carts.length / 2) {
    setResults('GANO', '#BDDBB0', 'PERDIO', '#f77b72');
    player_score += 1;
   } else {
    setResults('PERDIO', '#f77b72', 'GANO', '#BDDBB0');
    pc_score += 1;
   }
   score.innerHTML = `${playerName.toUpperCase()}: ${player_score} VS MAQUINA: ${pc_score}`;
   if(player_score == 3) {
    gameOptions.style.visibility = 'hidden';
    document.getElementById('finalResult').innerHTML = `EL GANADOR ES ${playerName.toUpperCase()}`;
   } else if (pc_score == 3) {
    gameOptions.style.visibility = 'hidden';
    document.getElementById('finalResult').innerHTML = `EL GANADOR ES LA MAQUINA`;
   }
}

// modulo de numeros negativos.
const mod = (a, b) => {
    const c = a % b;
    return c < 0 ? c + b : c;
}

// oculto el modal si se clickea afuera del mismo.
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// oculto el modal si se clickea en el span de close.
span.onclick = function() {
   modal.style.display = "none";
}

// Setea los resultados y los estilos.
const setResults = (playerResult, playerColor, machineResult, machineColor) => {
    const player = document.getElementById('player_result_label');
    const machine = document.getElementById('machine_result_label');
    player.innerHTML = playerResult;
    player.style.color = playerColor;
    machine.innerHTML = machineResult;
    machine.style.color = machineColor;
}