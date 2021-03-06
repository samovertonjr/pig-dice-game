/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Challenge:
Change the game to follow these rules:

1. A player looses his entire score when he rolls two 6 in a row. After that, it's the next players turn.
  (Hint: Always save the previous dice roll in a separate variable.)

2. Add an input field to the HTML where players can set the winning score , so that they can change the predefined score of 100.
   (Hint: you can read that a value with the .value property in JavaScript. This is a good opportunity to use google to figure this out.)

3. Add another dice to the game, so that there are two dice now. The player looses his current score when one of them is a 1.
   (Hint: You will need CSS to position the second dice, so take a look at the CSS for the first one).

*/
let  scores, roundScore, activePlayer, gamePlaying;
//let previousRoll;
init();



document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1.Random number
		const dice1 = Math.floor(Math.random() * 6) + 1;
		const dice2 = Math.floor(Math.random() * 6) + 1;

		// 2.Display the result
		const dice1DOM = document.querySelector('.dice-1');
		dice1DOM.style.display = 'block';
		dice1DOM.src = 'dice-'+ dice1 +'.png';

		const dice2DOM = document.querySelector('.dice-2');
		dice2DOM.style.display = 'block';
		dice2DOM.src = 'dice-'+ dice2 +'.png';

		//3.Update the round scoreIF the rolled number was not a 1.

		if(dice1 !== 1 && dice2 !== 1) {
			//Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
	
		} else {
			//Next player
			nextPlayer();
		}
		
		// if(dice1 && dice2 === 6 && previousRoll === 6) {
		// 	//Player looses score
		// 	scores[activePlayer] = 0;
		// 	document.querySelector('#score-' + activePlayer).textContent = '0';
		// 	nextPlayer();

		// } else if(dice1 !== 1) {
		// 	//Add score
		// 	roundScore += dice1;
		// 	document.querySelector('#current-' + activePlayer).textContent = roundScore;

		// } else {
		// 	//Next player
		// 	nextPlayer();
		// }
		// previousRoll = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add current  score to global score,
		scores[activePlayer] += roundScore;

		//Update the UI,
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.final-score').value;
		var winningScore;

		if(input) {
			winningScore = input;

		} else {
			winningScore = 100;
		}

		// Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
			gamePlaying = false;
		} else {
			//Next Player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {

	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';
}



function init() {
	scores = [0, 0];
	previousRoll = 0;
	activePlayer = 0;
	roundScore = 0;

	gamePlaying = true;

	document.querySelector('.dice-1').style.display = 'none';
	document.querySelector('.dice-2').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
