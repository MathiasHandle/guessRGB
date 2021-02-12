let numSquares = 6;
let colors = [];
let winnerColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.getElementById("reset");
let modeButtons = document.querySelectorAll(".mode");

init(); //YYY setting up everything for first time

//XXX Init
function init(){
    setDifficulty();
    setSquares();
    reset();
}


//XXX Difficulty
function setDifficulty(){
    modeButtons[1].classList.add("selected"); //sets .selected to hard as default
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //YYY same as that commented if/else statement down below

        /*  if(this.textContent === "Easy"){
                numSquares = 3;
            } else {
                numSquares = 6;
            } */
            reset();
        })
    };
}


//XXX Setting squares
function setSquares(){
    for(let i = 0; i < squares.length; i++)
    {//add colors to squares
    squares[i].addEventListener("click", function()
    {
        let clickedColor = this.style.backgroundColor; //the color I slected by clicking on it
        //YYY WIN
        if(clickedColor === winnerColor){
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor); //changes all tiles color to winnerColor
            h1.style.backgroundColor = clickedColor; //changes background of h1 to winnerColor
        }
        //YYY LOOSE
        else{
            this.style.backgroundColor = "#232323"; //changes wrong selected tile color to background color
            messageDisplay.textContent = "Try Again";
        }
    })
    };
    reset();
}


//XXX Reset function
function reset(){
    colors = generateRandomColors(numSquares);
    messageDisplay.textContent = ""; //resets message to none
    //pick a new winnerColor
    winnerColor = pickRandomWinnerColor();
    //change colorDisplay to match the winnerColor
    colorDisplay.textContent = winnerColor;
    resetButton.textContent = "New Colors";
    //change color of squares to new colors
    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    //changes back the h1 background color to the color of site
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
})


//XXX Functions
//changes colors of other squares and background to winnerColor
function changeColors(color){
    for(let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = winnerColor;
    }
}

//picks one color out of all avalible colors array
function pickRandomWinnerColor(){
    let random = Math.floor(Math.random() * colors.length); //zaokruhli a vyberie nahodne cislo od 0 do dlzky pola
    return colors[random];
}

//generates multiple random colors, takes number of colors to generate as argument
function generateRandomColors(num){
    let arr = [];
    //repeat num times
    for(let i = 0; i < num; i++){
        //get a random color and push it to array
        arr.push(generateRandomColor());
    }
    return arr;
}

//generates one random color
function generateRandomColor(){
    //pick a red from 0  to 255
    let r = Math.floor(Math.random() * 256);
    //pick a green from 0 to 255
    let g = Math.floor(Math.random() * 256);
    //pick a blue from 0 to 255
    let b = Math.floor(Math.random() * 256);
    //YYY Its important to add spaces after commas, otherwise the returned string wont match the clickedColor string!
    return "rgb(" + r +", " + g + ", " + b + ")"; 
}