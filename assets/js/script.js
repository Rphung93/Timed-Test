var questions = [
    {
        prompt: "Javascript is an _______ language?",
        options: ["<Object-oriented>", "<Object-based>", "<Procedural>", "<None of the above>"],
        answer: "<Object-oriented>"
    },

    {
        prompt: "Which of the following keywords is used to define a variable in Javascript?",
        options: ["Var", "let", "Both A and B", "None of the above"],
        answer: "Both A and B"
    },

    {
        prompt: "Which of the following methods is used to access HTML elements using Javascript?",
        options: ["getElementId()", "getElementByClassName()", "Both A and B", "None of the above"],
        answer: "Both A and B"
    },

    {
        prompt: "In JavaScript, which of the following is a logical operator?",
        options: ["|", "&&", "%", "/"],
        answer: "&&" 
    },

    {
        prompt: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: ["Throws an error", "Ignores the statements", "Gives warning", "None of the above"],
        answer: "Ignores the statement"
    }];
    
    var questionsEl = document.getElementById("questions");
    var timerEl = document.getElementById("timer");
    var choicesEl = document.getElementById("options");
    var submitBtn = document.getElementById("submit-score");
    var startBtn = document.getElementById("start");
    var nameEl = document.getElementById("name");
    var feedbackEl = document.getElementById("feedback");
    
    var currentQuestionIndex = 0;
    var time = questions.length * 15;
    var timerId;
    
    function quizStart() {
        timerId = setInterval(clockTick, 1000);
        timerEl.textContent = time;
        hideElement("start-screen");
        showElement("questions");
        getQuestion();
    }
    
    function getQuestion() {
        var currentQuestion = questions[currentQuestionIndex];
        var promptEl = document.getElementById("question-words");
        promptEl.textContent = currentQuestion.prompt;
        choicesEl.innerHTML = "";
        currentQuestion.options.forEach(function (choice, i) {
            var choiceBtn = createButton(choice, i);
            choicesEl.appendChild(choiceBtn);
        });
    }
    
    function createButton(content, index) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", content);
        choiceBtn.textContent = index + 1 + ". " + content;
        choiceBtn.onclick = questionClick;
        return choiceBtn;
    }
    
    function questionClick() {
        var correct = this.value === questions[currentQuestionIndex].answer;
        updateFeedback(correct);
        currentQuestionIndex++;
        if (currentQuestionIndex === questions.length) {
            quizEnd();
        } else {
            getQuestion();
        }
    }
    
    function updateFeedback(correct) {
        if (!correct) {
            time = Math.max(0, time - 10);
            timerEl.textContent = time;
            feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
            feedbackEl.style.color = "red";
        } else {
            feedbackEl.textContent = "Correct!";
            feedbackEl.style.color = "green";
        }
        showElement(feedbackEl);
        setTimeout(function () {
            hideElement(feedbackEl);
        }, 2000);
    }
    
    function quizEnd() {
        clearInterval(timerId);
        showElement("quiz-end");
        hideElement("questions");
        var finalScoreEl = document.getElementById("score-final");
        finalScoreEl.textContent = time;
    }
    
    function hideElement(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.classList.add("hide");
        }
    }
    
    function showElement(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.classList.remove("hide");
        }
    }
    
    function clockTick() {
        time--;
        timerEl.textContent = time;
        if (time <= 0) {
            quizEnd();
        }
    }
    
    function saveHighscore() {
        var name = nameEl.value.trim();
        if (name !== "") {
            var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
            var newScore = { score: time, name: name };
            highscores.push(newScore);
            localStorage.setItem("highscores", JSON.stringify(highscores));
        }
    }
    
    function checkForEnter(event) {
        if (event.key === "Enter") {
            saveHighscore();
        }
    }
    
    document.addEventListener("DOMContentLoaded", function () {
        nameEl.addEventListener("keyup", checkForEnter);
        submitBtn.addEventListener("click", saveHighscore);
        startBtn.addEventListener("click", quizStart);
    });