/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

  nav.classList.toggle("open");

});


/* Close menu after clicking link */

document.querySelectorAll("nav a").forEach(function (link) {

  link.addEventListener("click", function () {

    nav.classList.remove("open");

  });

});


/* =========================
   COPY COMMAND
========================= */

const toast = document.getElementById("toast");

document.querySelectorAll(".copy").forEach(function (button) {

  button.addEventListener("click", async function () {

    const command = button.getAttribute("data-copy");

    try {

      await navigator.clipboard.writeText(command);

    } catch (error) {

      console.log("Copy failed");

    }

    toast.classList.add("show");

    setTimeout(function () {

      toast.classList.remove("show");

    }, 1500);

  });

});


/* =========================
   QUIZ
========================= */

const questions = [

  {
    question:
      "Which tool is mainly used for version control?",

    answers: [
      "Git",
      "GitHub",
      "Netlify",
      "HTML"
    ],

    correct: 0
  },


  {
    question:
      "Which platform stores Git repositories online?",

    answers: [
      "Git",
      "GitHub",
      "Netlify",
      "CSS"
    ],

    correct: 1
  },


  {
    question:
      "What happens after you push changes to a GitHub repository connected to Netlify?",

    answers: [
      "The computer shuts down",
      "The files are deleted",
      "Netlify can detect the update and redeploy the website",
      "Git is uninstalled"
    ],

    correct: 2
  }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const questionElement =
  document.getElementById("question");

const answersElement =
  document.getElementById("answers");

const progressElement =
  document.getElementById("progress");

const bar =
  document.getElementById("bar");

const nextButton =
  document.getElementById("nextBtn");

const resultElement =
  document.getElementById("result");


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

  answered = false;

  nextButton.disabled = true;

  resultElement.textContent = "";

  const current =
    questions[currentQuestion];


  questionElement.textContent =
    current.question;


  progressElement.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;


  bar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;


  answersElement.innerHTML = "";


  current.answers.forEach(function (answer, index) {

    const button =
      document.createElement("button");

    button.className = "answer";

    button.textContent = answer;

    button.addEventListener("click", function () {

      selectAnswer(index, button);

    });

    answersElement.appendChild(button);

  });

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(index, selectedButton) {

  if (answered) return;

  answered = true;

  const current =
    questions[currentQuestion];


  const allButtons =
    document.querySelectorAll(".answer");


  allButtons.forEach(function (button, i) {

    if (i === current.correct) {

      button.classList.add("correct");

    }

  });


  if (index === current.correct) {

    score++;

    resultElement.textContent =
      "Correct! Great job.";

  } else {

    selectedButton.classList.add("wrong");

    resultElement.textContent =
      "Not quite. Check the green answer.";

  }


  nextButton.disabled = false;

}


/* =========================
   NEXT QUESTION
========================= */

nextButton.addEventListener("click", function () {

  if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    loadQuestion();

  } else {

    questionElement.textContent =
      `Quiz Complete — ${score}/${questions.length} Correct!`;

    answersElement.innerHTML = "";

    resultElement.textContent =
      score === questions.length
        ? "Excellent! You are ready for your presentation."
        : "Good job! Review the concepts and try again.";

    nextButton.textContent =
      "Restart Quiz ↻";

    nextButton.disabled = false;

    nextButton.onclick = function () {

      currentQuestion = 0;

      score = 0;

      nextButton.textContent =
        "Next Question →";

      nextButton.onclick = null;

      loadQuestion();

    };

  }

});


/* Start quiz */

loadQuestion();