/*
Je prend tout ce que j'ai besoin HTML, JS
 */

let button = document.getElementsByTagName("button")[0];
let checkbox = document.getElementsByTagName("input");
let result = document.getElementById("result");
let computer = document.getElementById("computerImg");

//Je commence avec une fonction "reinitcheck" qui va me permetre de check mes checkbox

function reinitcheck(index) {
    if (index === undefined) {
        for (let i = 0; i < checkbox.length; i++){
            checkbox[i].checked = false;
        }
    }
    else {
        switch (index) {
            case 0 :
                checkbox[1].checked = checkbox[2].checked = false;
                break;
            case 1 :
                checkbox[0].checked = checkbox[2].checked = false;
                break;
            case 2 :
                checkbox[1].checked = checkbox[0].checked = false;
                break;
            default :
                break;
        }
    }
}

//Je crée une fonction "randomChiFuMi" qui va choisir entre "pierre, papier, ciseau"

function randomChiFuMi() {
    let nb = Math.ceil(Math.random() * 3);
    switch (nb){
        case 1:
            return "papier";
        case 2:
            return "ciseau";
        case 3:
            return "pierre";
    }
}

reinitcheck();

document.addEventListener("click", function (e){
    switch (e.target) {
        case checkbox[0] :
            reinitcheck(0);
            break;
        case checkbox[1] :
            reinitcheck(1);
            break;
        case checkbox[2] :
            reinitcheck(2)
            break;
    }
});

button.addEventListener("click", function (){
    let tmp = null;
    // Je crée une boucle for qui va me permette de voir si l'utilisateur a bien choisis un seul checkbox
    for (let i = 0; i < checkbox.length ; i++){
        if (checkbox[i].checked){
            if (tmp === null){
                tmp = i;
            }
            else {
                alert("ON CHOISIT UNE SEULE POSSIBILITE !")
            }
        }
    }
    if (tmp !== null){
        let player = checkbox[tmp].parentElement.children[1].alt;
        let computer = randomChiFuMi();
        setComputer(computer);
        setTimeout(conditionOfVictory, 1000, player, computer);
    }
});




function conditionOfVictory (a , b){
    if (a === b){
        victory(0, a , b);
    }
    else if (a === "pierre"){
        if (b === "ciseau"){
            victory(1, a , b);
        }
        else {
            victory(2, b , a);
        }
    }
    else if (a === "ciseau"){
        if (b === "papier"){
            victory(1, a , b);
        }
        else {
            victory(2, b , a);
        }
    }
    else if (a === "papier"){
        if (b === "pierre"){
            victory(1, a , b);
        }
        else {
            victory(2, b , a);
        }
    }
    else{
        console.log("pas de condition de victoire");
    }
}

function victory(winner, winnerHand, looserHand){
    let newP = document.createElement("p");
    switch (winner){
        case 0 :
            newP.innerHTML = "Egalité " + winnerHand + " contre " + looserHand;
            break;
        case 1 :
            newP.innerHTML = "Le joueur gagne " + winnerHand + " contre " + looserHand;
            break;
        case 2 :
            newP.innerHTML = "L'ordinateur gagne " + winnerHand + " contre " + looserHand;
            break;
    }
    result.append(newP);
    reset()
}

function setComputer(text) {
    computer.src = "img/" + text + ".png";
    computer.alt = text;
}

function reset(){
    reinitcheck();
    setComputer("interrogation");
}