
var simon = {
	round: 0,
	pool: ['red','blue','yellow','green'],
	currentGame: [],
	player: [],
	strict: false,
	status: document.getElementById('status'),
	sound: {
	red : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	blue : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	yellow : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	green : new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	}

} 


function newGame() {
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
	playGame(id)
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
			simon.status.innerText = 'Incorrecto'
			setTimeout(function(){simon.status.innerText = ''},1000)
			setTimeout(newGame(),1100)
		} else {
			simon.status.innerText = 'Incorrecto'
			setTimeout(function(){simon.status.innerText = ''},1000)
			setTimeout(showMoves(),100)
		}
	} else {

		var check = simon.player.length === simon.currentGame.length
		if(check) {
			if(simon.round == 20) {
				 simon.status.innerText = 'Ganaste'
				 setTimeout(function(){simon.status.innerText = ''},3000)
				 setTimeout(newGame(),3000)
			} else {
				simon.status.innerText = 'Sig. nivel'
	
				setTimeout(function(){simon.status.innerText = ''},500)
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

function on() {
	var el = document.getElementById('on-off')
	el.addEventListener('click',function(){
		buttons()
	})
}
function buttons() {
	var _start = document.getElementById('start'),
		_strict = document.getElementById('strict')

		_start.addEventListener('click',function(){
			newGame()
		})
		_strict.addEventListener('click',function(){
			if(!simon.strict){
				simon.strict = true
				newGame()
				console.log('activado',simon.strict)
				
			} else {
				simon.strict = false
				console.log('desactivado',simon.strict)
				
			}
		})
}

