function init(){
const gameTitle = document.querySelector('.gameTitle');
const rematchButton = document.querySelector('.rematch');
const items = document.querySelectorAll('.item');
const gridArray = Array.from(items);
let tracking = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];
let currentPlayer = 'You';
// when an item is clicked it adds the class "You" to it and removes its index from the tracking array using the splice method
items.forEach(item => {
    item.addEventListener('click' , (e)=>{
        const index = gridArray.indexOf(e.target);
        if(
            items[index].classList.contains('You') ||
            items[index].classList.contains('I')
        ){
            return;
        }
        items[index].classList.add('You');
    const spliceNr = tracking.indexOf(index + 1)
    tracking.splice(spliceNr , 1);
    // checking if the user wins
    if(winCheck('You' , items)){
        gameTitle.innerHTML = "Good Job! You Won!";
    document.body.classList.add('over');
    }  
    // checking if nobody wins
    if(tracking.length ===  0){
        gameTitle.innerHTML = "Nobody Won...";
        document.body.classList.add('over');
        return;
    }
    // choosing a random item when its computer's turn to move
    const random = Math.floor(Math.random() * tracking.length);
    const computerIndex = tracking[random];
    items[computerIndex - 1].classList.add('I');
    tracking.splice(random , 1);
    // checking if the computer wins
    if(winCheck('I' , items)){
        gameTitle.innerHTML = "Haha! I Won!";
    document.body.classList.add('over');
    }  

    })
});
// refreshing the current page when user decides to play again
rematchButton.addEventListener('click' , ()=> {
location.reload();
})
}
init();
// checking the conditions in order to specify the winner
function winCheck(playerName , items){
    function check (pos1 , pos2 , pos3){
        if(
            items[pos1].classList.contains(playerName) &
            items[pos2].classList.contains(playerName) &
            items[pos3].classList.contains(playerName) 
    ){
        return true;
    }else{
        return false;
    }
}
// winning conditions
if (check(0 , 3 , 6)) return true;
else if (check(1 , 4 , 7)) return true;
else if (check(2 , 5 , 8)) return true;
else if (check(0 , 1 , 2)) return true;
else if (check(3 , 4 , 5)) return true;
else if (check(6 , 7 , 8)) return true;
else if (check(0 , 4 , 8)) return true;
else if (check(2 , 4 , 6)) return true;

}