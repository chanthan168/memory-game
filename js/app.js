
(function(){

var openCard;
var move;
var score;
var cardMove = document.getElementsByClassName('moves')[0];
var modal = document.getElementsByClassName('modal')[0];
const rating = document.querySelectorAll('.fa-star');

/*
 * Create a list that holds all of your cards
 */
function listCard(){
  var card = document.getElementsByClassName('card');
  var pics = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb","fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

  openCard = [];
  move = 0;
  score = 0;

  cardMove.innerText = move;
  modal.style.visibility = 'none';
  shuffle(pics);

  for (var i=0; i < card.length; i++){
      card[i].querySelector('.back').className = pics[i];
      card[i].addEventListener("click", displayCard);
  }

 second = 0;
 minute = 0;
 hour = 0;
 var timer = document.querySelector(".timer");
 timer.innerHTML = "0 mins 0 secs";
 clearInterval(interval);
}



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCard(){
  if (!this.classList.contains('show') && openCard.length < 2) {
      this.classList.toggle('show');

      openCard.push(this);

      if (openCard.length === 2) {
          moveCounter();
          checkMatch();
      }
    }
    result();
}

//Check if cards are match or not
function checkMatch() {
    if (openCard[0].getElementsByTagName("i")[0].className === openCard[1].getElementsByTagName("i")[0].className) {
      openCard[0].classList.toggle('match');
      openCard[1].classList.toggle('match');
      score++;
      openCard = [];
    }

    else {
      setTimeout(closeCard, 1000);
    }
  }

// Close card when unmatched
function closeCard() {
    openCard[0].classList.toggle('show');
    openCard[1].classList.toggle('show');
    openCard = [];
  }

//Move counter
function moveCounter(){
  move++;
  cardMove.innerText = move;

// Start Timer
  if(move == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

  //Rating star
  if (move > 8 && move < 12){
    for (var i=0; i < 3; i++){
      if (i > 1){
          rating[i].style.visibility = "collapse";
      }
    }
  }

  else if (move > 13){
    for (var i=0; i < 3; i++){
      if (i > 0){
          rating[i].style.visibility = "collapse";
      }
    }
  }
}

// Result function
function result(){
  if (score===8){
    clearInterval(interval);
    var timing = timer.innerHTML;
    document.getElementsByClassName("timing")[0].innerHTML = "in " + timing;

    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementsByClassName("starRating")[0].innerHTML = starRating;
    modal.style.display = 'flex';
  }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


listCard();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
})();
