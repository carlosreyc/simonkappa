
var simon = {
	round: 0,
	pool: ['red','blue','yellow','green'],
	currentGame: [],
	player: [],
	strict: false,
	sound: {
	red : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	blue : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	yellow : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	green : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	}

} 


function newGame() {
	// clearGame() Funcion original
	simon.currentGame = []
	simon.round = 0

	displayRound()
}

function displayRound() {
	var displayEL = document.getElementById('display')
	simon.round++
	displayEL.innerHTML = simon.round
	generateMove()
}

function generateMove() {
	simon.currentGame.push(simon.pool[(Math.floor(Math.random()*4))])
		console.log(simon.currentGame)
	showMoves()
}

function showMoves() {
	var i = 0,
		interval = setInterval(function() {
			playGame(simon.currentGame[i])
			i++
			if(i >= simon.currentGame.length) {
				clearInterval(interval)
			}
		},600)

		simon.player = []
}

function playGame(tile) {
	tileEl = document.getElementById(tile)
	tileEl.classList.add('hover-' + tile)
	sound(tile)
	setTimeout(function() {
		tileEl.classList.remove('hover-' + tile)
	},300)
}

function userClick(id) {
	simon.player.push(id)
	sound(id)
	playerTurn(id)
}

function sound(tile) {
	switch(tile) {
		case 'red':
		simon.sound.red.play()
		break;
		case 'blue':
		simon.sound.blue.play()
		break;
		case 'yellow':
		simon.sound.yellow.play()
		break;
		case 'green':
		simon.sound.green.play()
		break;					
	}
}

function playerTurn(x) {

	if(simon.player[simon.player.length - 1] !== simon.currentGame[simon.player.length - 1]) {
		if(simon.strict){
			// alert('Intentalo de nuevo desde el principio')
			newGame()
		} else {
			 alert('Te equivocaste, intentalo de nuevo')
			showMoves()
		}
	} else {

		// sound(x)
		var check = simon.player.length === simon.currentGame.length
		if(check) {
			if(simon.round == 20) {
				 alert	('Ganaste')
				 setTimeout(newGame(),3000)
			} else {
				// alert('siguiente Nivel')
				// nextLevel()
				setTimeout(displayRound(),500)
			}
		}
	}
}

function strict() {
	if(simon.strict == false) {
		simon.strict = true
		alert('Strict mode on')
	} else {
		simon.strict = false
		alert('Stric mode off')
	}
	newGame()
}

newGame()