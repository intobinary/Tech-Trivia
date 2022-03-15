/*===
Into Binary (https://trivia.intobinary.org)
&copy Coryright 2022 Into Binary. All rights reserved.
Written for -- www.trivia.intobinary.org
===*/

/*=== LIBRARIES ===*/

/*=== END LIBRARIES ===*/

/*=== CUSTOM ===*/
/*== [TRIVIA QUESTIONS -- Into Binary] ==*/
var section1 = [
	{
		title: "What are the properties supporting CSS styles for a document element?",
		choices: ["className and font", "style and className", "size and style", "style and font"],
		answer: 2
	},
  {
    title: "Which object is the main entry point to all client-side JavaScript features and APIs?",
    choices: ["Standard", "Position", "Location", "Window"],
    answer: 4
  },
  {
    title: "How are the objects organized in HTML DOM?",
    choices: ["Stack", "Queue", "List", "Hierarchy"],
    answer: 4
  },
  {
    title: "The snippet that has to be used to check if “a” is not equal to “null” is",
    choices: ["if(a!==null)", "if(a!=null)", "if(a!null)", "if(!a)"],
    answer: 1
  },
  {
    title: "What among the following is an appropriate event handler for input text among the below options?",
    choices: ["onchange", "onclick", "onblur", "onkeyup"],
    answer: 1
  },
  {
    title: "What will be the output if we compare “ten” and 10 with less than comparison operator(“ten”<10)?",
    choices: ["undefined", "False", "True", "error"],
    answer: 2
  },
  {
    title: "What is the substitute of == and !=? In JavaScript.",
    choices: ["=== and !==", "Equals and not equals to", "EqualsTo", "= and !"],
    answer: 1
  }
];

var section2 = [
  {
    title: "What ingrediant is NOT commly found in curry?",
    choices: ["salt", "coriander", "oats", "cumin"],
    answer: "oats"
  },
  {
    title: "What is the most common ratio for french bread?",
    choices: ["100 66 2 1.2", "100 10 0 0", "100 99 2 2", "100 60 60 1"],
    answer: "100 66 2 1.2"
  },
  {
    title: "Which is Tastiest?",
    choices: ["Turkey and Cheese Cat Food", "Wild goat dog food", "Rabbit Food", "Roadkill Raccoon"],
    answer: "Roadkill Raccoon"
  },
  {
    title: "Which pratice is NOT consider safe food practice",
    choices: ["Store meat in fridge", "Store meat in sun on front porch", "Eat chocolate", "Drink filtered water"],
    answer: "Store meat in sun on front porch"
  }
]

/*== [TRIVIA -- Into Binary] ==*/
/*** VARIABLES & OBJECTS ***/
var gameTag = document.querySelector(".js-trivia"),
	indexQuestionsTag = document.querySelector(".js-trivia-questions-index"),
	totalQuestionsTag = document.querySelector(".js-trivia-questions-total"),
	buttonDone = document.querySelector(".js-done"),
	buttonNext = document.querySelector(".js-next"),
	questionTag = document.querySelector(".js-trivia-question"),
	answerTagA = document.querySelector(".js-trivia-answer.nthChild-A"),
	answerTagB = document.querySelector(".js-trivia-answer.nthChild-B"),
	answerTagC = document.querySelector(".js-trivia-answer.nthChild-C"),
	answerTagD = document.querySelector(".js-trivia-answer.nthChild-D"),
	jekyllPlaceholderVar = "";
	
 var quiz = [], currentQuestion = [],
	qNoIndex = 0, qNoTotal = 100,
	sectionScore = 0, questionsSeen = [],
	answerScored = false, answerGiven = false, answerSkipped = false,
	timerTotalSecPerQuestion = 20,
	timerInterval = "";
/*** END VARIABLES & OBJECTS ***/

/*** SETUP ***/
setTimer();
playQuiz(section1);
/*** END SETUP ***/

/*** ACTIONS ***/
buttonNext.addEventListener("click", function() {
	nextQuestion();
});
buttonDone.addEventListener("click", function() {
	alert("YOUR SCORE:" + sectionScore + "/" + qNoTotal);
	toggleVisibility(buttonDone);
});
/*** END ACTIONS ***/

/*** FUNCTIONS ***/
function answerIsSelected(theTag, theTime, e) {
	
	document.querySelector(".js-trivia-answer.nthChild-A").classList.remove("is-selected");
	document.querySelector(".js-trivia-answer.nthChild-B").classList.remove("is-selected");
	document.querySelector(".js-trivia-answer.nthChild-C").classList.remove("is-selected");
	document.querySelector(".js-trivia-answer.nthChild-D").classList.remove("is-selected");

	theTag.classList.add("is-selected");
	
	if(gameTag.getAttribute("appMode") == "singlePlayer") { revealAnswer(); }
	else if (gameTag.getAttribute("appMode") == "multiPlayer") {
		var selectedTime = theTime + ' sec';
		e.target.setAttribute("data-time", selectedTime);
	}
}

function preparePage() {
	answerGiven = false;
	answerScored = false;
	
	if(answerSkipped == false) {
		document.querySelector(".js-trivia-answer.is-selected").classList.remove("is-wrong");
		document.querySelector(".js-trivia-answer.is-selected").classList.remove("is-selected");
	} else { answerSkipped == false; }
	document.querySelector(".js-trivia-answer.is-correct").classList.remove("is-correct");
	gameTag.setAttribute("appState", "quiz");

	toggleVisibility(buttonNext);
	setTimer();
}

function playQuiz(questionSet) {
	quiz = getQuestions(questionSet);
	
	if (quiz.length === 0) {
		alert("[ERROR:] No questions available.");
		return;
	} else {
		nextQuestion();
		qNoTotal = quiz.length + 1;
		
		totalQuestionsTag.innerHTML = qNoTotal;
	}
}

function getQuestions(arr) {
	var ranQuest = [];

	for (var i=0; i < arr.length; i++) {
		ranQuest.push(arr[i]);
	}
	
	return ranQuest;
}

function nextQuestion() {
	if(qNoIndex > 0 && qNoIndex < qNoTotal) { preparePage(); }
	
	if (qNoIndex < qNoTotal) {
		qNoIndex += 1;
		currentQuestion = quiz.pop();
		
		indexQuestionsTag.innerHTML = qNoIndex;
		
		questionTag.innerHTML = currentQuestion.title;
		answerTagA.innerHTML = "A: " + currentQuestion.choices[0]; 
		answerTagB.innerHTML = "B: " + currentQuestion.choices[1]; 
		answerTagC.innerHTML = "C: " + currentQuestion.choices[2]; 
		answerTagD.innerHTML = "D: " + currentQuestion.choices[3]; 
	}
}

function revealAnswer() {
	var theTag = document.querySelector(".js-trivia-answer.is-selected");
	if(theTag != undefined) {
		if(theTag.getAttribute("answer") != currentQuestion.answer) { theTag.classList.add("is-wrong"); }
		else {
			if(answerScored == false) {
				sectionScore += 1;
				answerScored = true;
			}
		}
	}
	
	clearInterval(timerInterval);
	document.querySelector(".js-trivia-answer[answer='"+ currentQuestion.answer +"']").classList.add("is-correct");
	
	setTimeout(function() {
		if (qNoIndex < qNoTotal) { toggleVisibility(buttonNext); }
		if (qNoIndex == qNoTotal) { toggleVisibility(buttonDone); }

		gameTag.setAttribute("appState", "discussion");
	}, 1000);
}

function revealScore() {
	
}

function setTimer() {
	var timerTag = document.querySelector(".js-timer-tick"),
		timerTotalSecForCurrentQuestion = timerTotalSecPerQuestion,
		timerTick = "";
	
	timerInterval = setInterval(function() {
		if(timerTotalSecForCurrentQuestion >= 0) {
			timerTick = timerTotalSecForCurrentQuestion--;
			timerTag.textContent = timerTick;
			
			document.querySelector(".js-timer").addEventListener("click", function() {
				answerSkipped = true;
				revealAnswer();
			});
			
			
				document.querySelector(".js-trivia-answer.nthChild-A").addEventListener("click", function(e) {
					if(answerGiven == false) {
						answerGiven = true;
						
						if(gameTag.getAttribute("appState") == "quiz") {
							answerIsSelected(this, timerTick, e);
						} else if(gameTag.getAttribute("appState") == "discussion") {
							e.preventDefault();
						}
					}
				});
				document.querySelector(".js-trivia-answer.nthChild-B").addEventListener("click", function(e) {
					if(answerGiven == false) {
						answerGiven = true;
						
						if(gameTag.getAttribute("appState") == "quiz") {
							answerIsSelected(this, timerTick, e);
						} else if(gameTag.getAttribute("appState") == "discussion") {
							e.preventDefault();
						}
					}
				});
				document.querySelector(".js-trivia-answer.nthChild-C").addEventListener("click", function(e) {
					if(answerGiven == false) {
						answerGiven = true;
						
						if(gameTag.getAttribute("appState") == "quiz") {
							answerIsSelected(this, timerTick, e);
						} else if(gameTag.getAttribute("appState") == "discussion") {
							e.preventDefault();
						}
					}
				});
				document.querySelector(".js-trivia-answer.nthChild-D").addEventListener("click", function(e) {
					if(answerGiven == false) {
						answerGiven = true;
						
						if(gameTag.getAttribute("appState") == "quiz") {
							answerIsSelected(this, timerTick, e);
						} else if(gameTag.getAttribute("appState") == "discussion") {
							e.preventDefault();
						}
					}
				});
		}
		else {
			answerSkipped = true;
			revealAnswer();
		}
	}, 1000);
}

function toggleVisibility(theTag) {
	if(theTag.classList.contains("is-hidden")) { theTag.classList.remove("is-hidden"); }
	else { theTag.classList.add("is-hidden"); }
	
	/*
	if(theTag.classList.contains("is-hidden")) { theTag.classList.add("is-visible"); }
	if(theTag.classList.contains("is-visible")) { theTag.classList.add("is-hidden"); }
	*/
}
/*** END FUNCTIONS ***/

/*=== END CUSTOM ===*/