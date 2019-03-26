
//This is the Array of all cards
const allcards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

let shuhffledcards = shuffle(allcards);

displaycards();

//This function is to dispaly cards in the HTML
function displaycards(){
    let total_innerhtml = "";
    for(card of shuhffledcards){
        total_innerhtml = total_innerhtml + 
            `<li class="card">
                <i class="${card}"></i>
            </li>`
    }
    document.querySelector('.deck').innerHTML = total_innerhtml;
    startgame();
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

let remainingcards = 16;
//This function to make action with the cards
function startgame(){
    const list = document.querySelectorAll('.card');
    
    for (i of list) {
        i.addEventListener('click', function(){
    this.classList.add("show");
    this.classList.add("open");
    var showncards = document.querySelectorAll('.show.open'); 
            if(showncards.length == 2){
                
                increasemoves();
                //This part to compare the chosen cards
                if(showncards[0].innerHTML == showncards[1].innerHTML ){
                    showncards[0].classList.remove('show');
                    showncards[0].classList.remove('open');
                    showncards[1].classList.remove('show');
                    showncards[1].classList.remove('open');
                    showncards[0].classList.add('match');
                    showncards[1].classList.add('match');
                    remainingcards = remainingcards - 2;
                    
                    if (remainingcards == 0){
                        if (confirm(`CONGRADULATIONS!you got ${remainingstars} stars \n and the remaining time is: ${i} Seconds \n Press ok to play again`)) {
                            location.reload();
                    } else {
                        document.querySelector('.deck').style.pointerEvents = "none";
                    }}
                }else{ 
                    //This part to make the dely in the incorrect match
                    document.querySelector('.deck').style.pointerEvents = "none";
                    setTimeout(() => {
                        showncards[0].classList.remove('show');
                        showncards[0].classList.remove('open');
                        showncards[1].classList.remove('show');
                        showncards[1].classList.remove('open');
                        document.querySelector('.deck').style.pointerEvents = "all";
                     }, 1000);}
            }
        });
    }}

let remainingstars = 3;

//This function to count the moves and calculate the stars
function increasemoves(){
    let moves = document.querySelector(".moves");
    moves.innerHTML = Number(moves.innerHTML) + 1;
    
    if (Number(moves.innerHTML) == 10 || Number(moves.innerHTML) == 20 || Number(moves.innerHTML) == 30){
        remainingstars--;
        document.querySelector(".stars").removeChild(document.querySelector(".stars li"));
    }
}

var i = 120;                     

//Timer function from https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
function timer () {           
    setTimeout(function () {
        document.querySelector(".time").innerHTML = i;
        i--;                     
        if (remainingcards == 0) {
          
        }else if (i >= 0) {            
            timer();             
        
        }else{
            if (confirm(`Sorry, timeout press ok to try again`)) {
                location.reload();
            } else {
                document.querySelector('.deck').style.pointerEvents = "none";
          }
      }
   }, 1000)
}

timer();

