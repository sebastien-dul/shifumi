// Les variables de ShiFuMi
let playerChoice = "";
let selectedButton = null;
let playerScore = 0;
let computerScore = 0;

// Les conséquences des choix du joueur
function startDuel() {
    if (playerChoice === "") { // Cela affiche un message incitant le joueur à faire un choix grâce à alert
        alert("Veuillez choisir une action avant de jouer !");
        return;
    }

    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = "";
    if (playerChoice == computerChoice) {
        result = "Match nul.";
    } else if (
        (playerChoice == "rock" && computerChoice == "scissors") ||
        (playerChoice == "paper" && computerChoice == "rock") ||
        (playerChoice == "scissors" && computerChoice == "paper")
    ) {
        result = "Vainqueur tu es !";
        playerScore++;
    } else {
        result = "Perdu...";
        computerScore++;
    }

    updateScores();
    updateWinPercentage();
    displayResult(result);
}

// Code pour les boutons de choix
function selectChoice(choice) {
    if (selectedButton) {
        selectedButton.classList.remove("selected"); // Supprime la classe "selected" du bouton précédemment sélectionné, pour que le joueur sache toujours ce qu'il joue même quand il change de choix avant de jouer
    }

    const newSelectedButton = document.getElementById(choice);
    selectedButton = newSelectedButton; // Met à jour le bouton sélectionné
    newSelectedButton.classList.add("selected"); // Reliée à la classe CSS selected, elle permet de voir notre choix grâce à la bordure blanche
    playerChoice = choice; // Stocke le choix du joueur, sinon cela ne fonctionne pas

}

const choiceButtons = document.getElementsByClassName("choiceButton");

Array.prototype.forEach.call(choiceButtons, button =>
    button.addEventListener("click", () => selectChoice(button.id))
);

// Code pour le bouton "SHIFUMU !"
playButton.addEventListener("click", startDuel);

// Affiche le score du joueur et celui de l'ordinateur
function updateScores() {
    document.getElementById("playerScore").textContent = "Joueur : " + playerScore;
    document.getElementById("computerScore").textContent = "Ordinateur : " + computerScore;
}

// Met à jour le pourcentage de victoire du joueur
function updateWinPercentage() {
    const totalCompletedGames = playerScore + computerScore; // Nombre total de parties terminées
    const winPercentage = (playerScore / totalCompletedGames) * 100 || 0; // Calcul du pourcentage de victoire du joueur

    document.getElementById("winPercentage").textContent =
        "Pourcentage de victoire : " + winPercentage.toFixed(2) + "%";
}

// Affiche les textes de victoire/défaite avec la bonne couleur en utilisant le CSS
function displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = result;
    resultElement.className = "gameResult " + (result == "Vainqueur tu es !" ? "winner" : result == "Perdu..." ? "lost" : "");
}