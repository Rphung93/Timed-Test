var scoresBtn = document.querySelector("#view-high-scores");

function printHighscores() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort((a, b) => b.score - a.score);
    var olEl = document.getElementById("highscores");
    highscores.forEach(score => {
        var liTag = document.createElement("li");
        liTag.textContent = `${score.name} - ${score.score}`;
        olEl.appendChild(liTag);
    });
}


function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
}


document.getElementById("clear").addEventListener("click", clearHighscores);

printHighscores();