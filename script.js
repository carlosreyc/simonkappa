var count = 0,
	poolColors = ['red','blue','yellow','green'],
	gameMoves = [],
	playerMoves = [],
	strictMode = false,
	start = false,
	displayEl = document.getElementById('display'),
	redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
	blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
	yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
	greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
	no = new Audio('sound/no.mp3'),
	win = new Audio('sound/win.mp3')

function animateTiles(tile) {
	// Ilumina cada 0.8 segundos el cuadrado correspondiente al argumento
	var tileElement = document.getElementById(tile)
	tileElement.classList.add('hover-' + tile)
	window[tile +'Sound'].play()
	setTimeout(function() {
		tileElement.classList.remove('hover-' + tile)
	},800)

}

function newGame() {
	count = 0,
	gameMoves = [],
	playerMoves = [];
	

	newRound()
}
function newRound() {
	
	count++
	displayEl.innerHTML = count
	makeMove()
}
function makeMove() {
	
	gameMoves.push(poolColors[Math.floor(Math.random() * 4)])
	logic()
}
function logic() {
	
	var i = 0;
	var  interval = setInterval(function() {
	    	console.log(gameMoves)
	    	animateTiles(gameMoves[i])
	    	i++
	    	if(i >= gameMoves.length) {
	    	clearInterval(interval)
	    }
      },100)
	    playerMoves = []

	}

function normalChecker(tileName) {
	
	playerMoves.push(tileName)
	playerTurn(tileName)
}
function playerTurn(tile) {
	
	console.log(gameMoves)
	console.log(playerMoves)
		if(gameMoves[gameMoves.length - 1] !== playerMoves[playerMoves.length - 1]) {
	   // if(JSON.stringify(gameMoves) !== JSON.stringify(playerMoves)) {
		if(strictMode) {
			no.play()
			newGame()
		} else {
			no.play()
			logic()
		}
	} else {
		if(gameMoves.length === playerMoves.length) {
			if(count === 20) {
				win.play()
				newGame()
			} else {
				newRound()
			}
		}
	}
}
function ready(fn) {
	
	if(document.readyState != 'loading'){
		fn()
	} else {
		document.addEventListener('DOMContentLoaded',fn())
	}
}
function fn() {
	
	let start = document.getElementById('start')
	displayEl.innerHTML = '__'
	start.addEventListener('click',function() {
		newGame()
	})
}
function strictOn() {
	
	strictMode = true
	newGame()

}



document.getElementById('on-off').addEventListener('click', function() {
	start = true

	if(start) {
	
	ready(fn)

	}
	start = false
	// displayEl.innerHTML = ''

})


	document.getElementById('red').addEventListener('click',function() {
		animateTiles('red')
		normalChecker('red')
	})
	document.getElementById('blue').addEventListener('click',function() {
		animateTiles('blue')
		normalChecker('blue')
	})
	document.getElementById('yellow').addEventListener('click',function() {
		animateTiles('yellow')
		normalChecker('yellow')
	})
	document.getElementById('green').addEventListener('click',function() {
		animateTiles('green')
		normalChecker('green')
	})

	document.getElementById('strict').addEventListener('click',function() {
		swal({
			title: 'Are you sure?',
			text: 'You lose automatically if you get 1 key wrong',
			type: 'warning',
			confirmButtonColor: "#DD6B55",
			confirmButtonText: 'Confirm',
			closeOnConfirm: true,
			html: false,

		},function() {
			strictOn()
		})
	})