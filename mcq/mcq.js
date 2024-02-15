document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      id: 1,
      description:
        "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
      options: [
        "Dan Simmons",
        "Douglas Adams",
        "Stephen Fry",
        "Robert A. Heinlein",
      ],
    },
    {
      id: 2,
      description:
        "Which of the following numbers is the answer to Life, the \
                  Universe and Everything?",
      options: ["66", "13", "111", "42"],
    },
    {
      id: 3,
      description: "What is Pan Galactic Gargle Blaster?",
      options: ["A drink", "A machine", "A creature", "None of the above"],
    },
    {
      id: 4,
      description: "Which star system does Ford Prefect belong to?",
      options: ["Aldebaran", "Algol", "Betelgeuse", "Alpha Centauri"],
    },
  ];

  const answerKey = {
    1: "Douglas Adams",
    2: "42",
    3: "A drink",
    4: "Betelgeuse",
  };

  let quizTemplate = Handlebars.compile(
    document.getElementById("questionsTemplate").innerHTML
  );
  let mainHTML = quizTemplate(questions);
  document.querySelector("main").insertAdjacentHTML("afterbegin", mainHTML);

  const QUIZ = document.getElementById("quiz");
  const RESET = document.getElementById("quiz_reset");
  const QUESTIONS = [...document.querySelectorAll('div[id^="question"]')];

  function removeErrorMessages() {
    let errors = [...document.querySelectorAll(".answer_error")];

    if (errors.length > 0) {
      errors.forEach((ele) => ele.remove());
    }
  }

  function answerError(question, message) {
    let div = document.createElement("div");
    div.innerText = message;
    div.className = "answer_error";
    div.style.fontWeight = "bold";
    question.insertAdjacentElement("beforeend", div);
  }

  function isCorrect(answer) {
    answer.classList.add("correct_answer");
  }

  function getAnswerOptions(question) {
    return [...question.querySelectorAll("input")];
  }

  function isIncorrect(answer) {
    answer.classList.add("wrong_answer");
  }

  function resetQuestion(question) {
    [
      question.querySelector(".wrong_answer"),
      question.querySelector(".correct_answer"),
    ]
      .filter((ele) => ele)
      .forEach(
        (ele) => (ele.className = ele.className.replace(/\w+answer/, ""))
      );
  }

  function isOneOptionSelected(options, question) {
    if (options.length === 0) {
      answerError(question, "Please select an answer");
      return false;
    } else if (options.length > 1) {
      answerError(
        question,
        "Please don't select more than one answer. Cheater."
      );
      return false;
    } else {
      return options.at(0);
    }
  }

  function gradeQuestion(question) {
    resetQuestion(question);
    let questionNumber = question.id.match(/(\d+$)/)[1];
    let selectedOption = getAnswerOptions(question).filter(
      (ele) => ele.checked
    );

    selectedOption = isOneOptionSelected(selectedOption, question);
    if (!selectedOption) return;

    let chosenAnswerText = selectedOption.parentElement.innerText;

    if (chosenAnswerText === answerKey[questionNumber]) {
      isCorrect(selectedOption.closest("span"));
    } else {
      isIncorrect(selectedOption.closest("span"));
    }
  }

  function gradeTest(event) {
    event.preventDefault();
    removeErrorMessages();
    QUESTIONS.forEach((question) => gradeQuestion(question));
  }

  function resetTest(event) {
    event.preventDefault();
    [...document.querySelectorAll(".answer_error")].forEach((ele) =>
      ele.remove()
    );

    let results = [...document.querySelectorAll(".correct_answer")].concat([
      ...document.querySelectorAll(".wrong_answer"),
    ]);
    results.forEach((answer) => {
      answer.className = answer.className.replace(/\w+answer/, "");
    });

    QUIZ.reset();
  }

  RESET.addEventListener("click", resetTest);
  QUIZ.addEventListener("submit", gradeTest);
});
