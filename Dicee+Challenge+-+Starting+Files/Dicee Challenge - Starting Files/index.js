
function replaceDice(){
    var number1 = Math.floor(Math.random() * 6) + 1;
    var number2 = Math.floor(Math.random() * 6) + 1;

    document.querySelector(".img1").setAttribute("src", "./images/dice"+number1+".png");

    document.querySelector(".img2").setAttribute("src", "./images/dice"+number2+".png");
    
    var html = document.querySelector("h1");

    if(number1 > number2){
        html.innerHTML = "Player 1 wins";
    }
    else if (number1 < number2){
        html.innerHTML = "Player 2 wins";
    }
    else{
        html.innerHTML = "Draw!";
    }
}


replaceDice();