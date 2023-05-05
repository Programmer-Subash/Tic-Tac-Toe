//slecting tic tac toe
const ticTacToe = document.querySelector(".tic-tac-toe");
//selecting game-state
const cross = document.querySelector(".cross p");
const circle = document.querySelector(".circle p");
const draw = document.querySelector(".draws p");
//turn-indicator
const turnIndicator = document.querySelectorAll(".turn-indicator span");
//reset button 
const reset = document.querySelector(".arrows-rotate");
//setting items
const setting = document.querySelector(".setting");
const settingItems = document.querySelector(".setting-items");
//new game
const newGame = document.querySelector(".new-game");
//wining 
const winIndex = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
]
//active player
let activePlayer = 0;
//clicked box
let clickedBox;
//no of draw
let noDraws = 0;
//check draw
let checkDraw = false;
//when someone win noone can play 
let someOneWin = false;
//last winner
let lastWinner = undefined;
//Players 
const player00 = {
    symbol: "circle",
    win: 0,
    index: [],
}
const player01 = {
    symbol: "cross",
    win: 0,
    index: [],
}
//change Player
function changePlayer() {
    activePlayer++;
    activePlayer %= 2;
}
//indicate active Player
function indicateActivePlayer() {

    turnIndicator[0].classList.toggle("active-circle");
    turnIndicator[1].classList.toggle("active-cross")
}
//update Player index
function updateIndex(player, boxNumber) {
    if (player.index.length < 3) {
        player.index.push(Number(boxNumber));
    }
}
//update cross element
function updateCrossElement() {
    cross.innerText = player01.win + " wins";
}
//update circle element
function updateCircleElement() {
    circle.innerText = player00.win + " wins";
}
//update draw element
function updateDrawElement() {
    draw.innerText = noDraws + " draws";
}
//win function
function win(player) {
    let count = 0;
    if (player.index.length == 3) {
        player.index.sort();
        for (let i = 0; i < winIndex.length; i++) {
            count = 0;
            for (let j = 0; j < 3; j++) {
                if (winIndex[i][j] == player.index[j]) {
                    count++;
                }
            }
            if (count == 3) {
                player.win++;
                someOneWin = true;
                checkDraw = false;
                lastWinner= activePlayer;
            }
        }
    }
    if (!someOneWin&&player.index.length == 3 && player00.index.length == player01.index.length) {
        checkDraw=true;
    }

}
//draw circle
function drawCircle() {
    if (clickedBox.children.length == 0 && player00.index.length < 3) {
        const newElement = document.createElement("i");
        newElement.classList.add("fa-regular");
        newElement.classList.add("fa-circle");
        newElement.style.color = "#79cadc";
        newElement.style.fontSize = "60px";
        clickedBox.append(newElement);
    }
}
// draw cross
function drawCross() {
    if (clickedBox.children.length == 0 && player01.index.length < 3) {
        const newElement = document.createElement("i");
        newElement.classList.add("fa-solid");
        newElement.classList.add("fa-xmark");
        newElement.style.color = "#3a98d4";
        newElement.style.fontSize = "75px";
        clickedBox.append(newElement);
    }
}
ticTacToe.addEventListener("click", function (e) {
    const target = e.target;
    if (target.matches("div.box") && !someOneWin && !checkDraw ) {
        clickedBox = target;
        if (activePlayer == 0) {
            drawCircle();
            updateIndex(player00, clickedBox.classList[0].slice(4, 5));
            win(player00);
            updateCircleElement();
        } else {
            drawCross();
            updateIndex(player01, clickedBox.classList[0].slice(4, 5));
            win(player01);
            updateCrossElement();
        }
        changePlayer();
        indicateActivePlayer()
        if(checkDraw==true){
            noDraws++;
            updateDrawElement();
        }
    }
})
//reset box
function resetBox(index){
    for(let i=0;i<index.length;i++){
        const boxClassName = ".box0"+index[i];
        const box = document.querySelector(boxClassName);
        box.innerHTML = "";
    }

}
//when calculating active player when reset
function activePlayerWhenReset(){
    if(lastWinner==1){
        activePlayer=1;
        turnIndicator[0].classList.remove("active-circle");
        turnIndicator[1].classList.add("active-cross");
    }else{
        activePlayer=0;
        turnIndicator[0].classList.add("active-circle");
        turnIndicator[1].classList.remove("active-cross");  
    }
}
reset.addEventListener("click",function(){
    resetBox(player00.index);
    resetBox(player01.index);
    player00.index=[];
    player01.index=[];
    activePlayerWhenReset();
    checkDraw=false;
    someOneWin=false;
})
setting.addEventListener("click",function(e){
    settingItems.classList.toggle("setting-items-left");
})
newGame.addEventListener("click",function(){
    resetBox(player00.index);
    resetBox(player01.index);
    player00.index=[];
    player01.index=[];
    player01.win=0;
    player00.win=0;
    noDraws=0;
    updateCircleElement();
    updateCrossElement();
    updateDrawElement();
    activePlayer=0;
    turnIndicator[0].classList.add("active-circle");
    turnIndicator[1].classList.remove("active-cross");  
    checkDraw=false;
    someOneWin=false;
})