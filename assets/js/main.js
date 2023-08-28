let player_score = 0;
let pc_score = 0;
const carts = ['Piedra', 'Papel', 'Tijera'];
const modal = document.getElementById('resultModal');
var span = document.getElementsByClassName("close")[0];

const nameValidation = () => {

    const playerName = document.getElementById('player').value;
    const gameOptions = document.getElementById('gameOptions');
    let score = document.getElementById('score');
    if(playerName.length > 0) {
        gameOptions.style.visibility = 'visible';
        score.innerHTML = `${playerName.toUpperCase()}: ${player_score} VS MAQUINA: ${pc_score}`;
    } else {
        console.error('No se ingreso ningun player name');
        window.alert('Ingrese el nombre de el jugador');
    }

}

const reset = () => {
    player_score = 0;
    pc_score = 0;
    document.getElementById('score').innerHTML = '';
    document.getElementById('player').value = '';
    let gameOptions = document.getElementById('gameOptions');
    gameOptions.style.visibility = 'hidden';
}

const selectOption = (value) => {
    const randomMachinePlay = Math.floor(Math.random() * (3));
    const playerName = document.getElementById('player').value;
    const gameOptions = document.getElementById('gameOptions');
    let score = document.getElementById('score');
    document.getElementById('player_result').src = `assets/images/${carts[value]}.png`;
    document.getElementById('machine_result').src = `assets/images/${carts[randomMachinePlay]}.png`

    modal.style.display = 'block';
    if( value == randomMachinePlay) {
        console.log('Empate');
        return;
    }
   if(mod(value - randomMachinePlay, 3) < 3 / 2) {
    console.log('GANA USUARIO');
    player_score += 1;
   } else {
    console.log('GANA PC');
    pc_score += 1;
   }
   score.innerHTML = `${playerName.toUpperCase()}: ${player_score} VS MAQUINA: ${pc_score}`;
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