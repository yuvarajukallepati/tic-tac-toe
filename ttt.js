let boxes=document.querySelectorAll(".box");
let res=document.querySelector("#res");
let newgame=document.querySelector("#newgame");
let msgContainer=document.querySelector(".msgContainer");
let msg=document.querySelector("#msg");

let turnx=true;   // this  tells us which player is ready to select the box.
let count=0;      // to track that a match is draw.

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];

const resetgame = () => {
    turnx=true; 
    count=0;          // this function is used to reset the whole game from start.
    enableboxes();        // this function allows to access boxes once again.
    msgContainer.classList.add("hide");  //  to hide the msg part.

}

boxes.forEach((box) => {
    box.addEventListener("click",()=> {
        //console.log("box clicked");
         //box.innerText="abcd"; // this will appear on the box button if it is clicked.
// inn this if and else condition there is a small loo hole which is
// if we click any box button two times the value will change.
// to overcome this loophole we can use the keyword "disable",which will be used not to click the same button twice.

        if(turnx===true) {      // playerX turn  and //we can write if(turnx) is equal to if(turnx === true) same.
            box.innerText="x";
            box.style.color="red";// this color will apply to the text inat paricular box only.
            turnx = false; // if this is not here then all boxes will be printing "x" only.
        }
        else{  // playerO turn
            box.innerText="o";
            box.style.color="green";// this color will apply to the text inat paricular box only.
            turnx = true;   //if this is not here then all boxes will be printing "o" only from here.
        }// so this line will again go to if condition, the alternate x & o will be printed.
        
        box.disabled = true; //which will be used not to click the same button twice.
        
        count++;

       let isWinner= checkWinner(); // used to check the winner. and iswinner is an another variable.
                                    // here " checkWinner " value is going to store in the " isWinner " variable.
       if(count === 9 && !isWinner){
        gameDraw();
       }
    });
}); 

const gameDraw=()=>{
    msg.innerText="your game was a draw";
    msgContainer.classList.remove("hide");
    disableboxes();
}
const disableboxes = () => {
    for(let box of boxes){     // this function is used to disable boxes.
        box.disabled=true;
    }
};

const enableboxes = () => { //this function is used to enaable boxes once again.
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";     // this is used to clear the text inside the boxes.
    }
};

const showWinner = (winner) => {  // winner is a normal variable parameter.
    msg.innerText=`Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide"); // since we are getting a winner the winner should be printed.
    disableboxes();   // this is used to disable the remaining boxes which were unmarked. 
}
    const showLoser = () => {  // winner is a normal variable parameter.
    msg.innerText="Neither of you  'X' nor 'O' won the game, Try again";
    msgContainer.classList.remove("hide"); // since we are getting a winner the winner should be printed.
    disableboxes();   // this is used to disable the remaining boxes which were unmarked. 
}

const checkWinner=() => {
     for(let pattern of winPatterns){  // checking each and every pattern in the "winPatterns array".
        //console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]); // this will give which boxes are being checked.
        // // this will give which boxes are being checked and the symbol in it also.
        //console.log(boxes[pattern[0]].innerText,boxes[pattern[ 1]].innerText,boxes[pattern[2]].innerText); 

        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        
        if(pos1 !="" && pos2 !="" && pos3 !=""){ // this is to check no position is left unmarked,if unmarked can't decide winner.
            if(pos1 === pos2 && pos2 === pos3){ // check the marked values are same or not.
               // console.log("winner",pos1);
                showWinner(pos1); // pos1 will give the output.
            }
        }
        
     }
};


newgame.addEventListener("click",resetgame);   // for newgame button.
res.addEventListener("click",resetgame);   //for reset button.
