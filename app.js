/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

const STORE = {
  questions: [
    // 1
    {
      picture: 'images/question-1.jpg',
      question: 'What year was the Japanese animation film studio, Studio Ghibli, founded?',
      answers: [
        '1979',
        '1985',
        '1989',
        '1992'
      ],
      correctAnswer: '1985'
    },
    // 2
    {
      picture: 'images/question-2.jpg',
      question: 'Who of the following is not one of the co-founders of Studio Ghibli?',
      answers: [
        'Hayao Miyazaki',
        'Takahata Isao',
        'Suzuki Toshio',
        'Hideaki Anno'
      ],
      correctAnswer: 'Hideaki Anno'
    },
    // 3
    {
      picture: 'images/question-3.jpg',
      question: "A common theme throughout Studio Ghibli's animations is:",
      answers: [
        'Environmentalism',
        'Dystopia',
        'Good VS. Evil',
        'Survival'
      ],
      correctAnswer: 'Environmentalism'
    },
    // 4
    {
      picture: 'images/question-4.jpg',
      question: "Which of the following is Studio Ghibli's highest grossing animation?",
      answers: [
        'My Neighbor Totoro',
        'Spirited Away',
        "Howl's Moving Castle",
        'Princess Mononoke'
      ],
      correctAnswer: 'Spirited Away'
    },
    // 5
    {
      picture: 'images/question-5.jpg',
      question: 'Which real world town served as inspiration for the setting of the animation, Spirited Away?',
      answers: [
        'Jiufen, Taiwan',
        'Nara, Japan',
        'Xiamen, China',
        'Penang, Malaysia'
      ],
      correctAnswer: 'Jiufen, Taiwan'
    }
  ],
  quizStarted: false,
  currentQuestion: 0,
  score: 0,
  submittingAnswer: false
  }
  
/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates

// generate HTML for start page
function generateStartPage() {
  return `
   <div class="start-quiz-page">
     <img src="images/haku.png" class="welcome-img">
     <h2>Welcome! I hope you like anime!</h2>
     <p>This is a short and sweet quiz about Studio Ghibli, the Disney of Japanese animation.</p>
     <div class="start-quiz-button">
       <button type="submit" id="start-quiz-btn">Start Quiz</button>
     </div>
   </div>
  `;
}

// changes currentQuestion + 1
function nextQuestion() {
  console.log("Moving to Next Question");
  STORE.submittingAnswer = false;
  STORE.currentQuestion++;
  if (STORE.quizStarted === true)
    console.log("You are on question " + (STORE.currentQuestion + 1));
}

// generates HTML for answer of current question
function generateAnswers(){
  console.log("Generating Answer Options");

  let answersArray = STORE.questions[STORE.currentQuestion].answers;
  let answerOptions = "";
  for(let i=0; i < answersArray.length; i++) {
      answerOptions += `
        <div id="option-container-${i}">
            <input type="radio" name="answer-options" id="option${i+1} value="${answersArray[i]}" required>
            <label for="option${i+1}">${answersArray[i]}</label>
        </div>
      `;
    }
  return answerOptions;
}

  // check if submitted answer matches correctAnswer
  function submitAnswer() {
    console.log("Checking Answer");
    let selectedAnswer = $("input[type='radio'][name='answer-options']:checked").val();
    let index = STORE.currentQuestion
    let isCorrect = false;
    if (selectedAnswer === STORE.questions[index].correctAnswer) {
      submittingAnswer = true;
      isCorrect = true;
    } else {
      submittingAnswer = true;
    }
    return isCorrect;
    
  }

// generate HTML for answer results for each question
function checkAnswer() {
  console.log("Generating Response");
  let index = STORE.currentQuestion;
  if (submitAnswer() === true) {
    console.log("Correct Answer");
    STORE.score += 1
    return `
      <div class="correct-answer">
        <p>You are correct!</p>
      </div>
    `;
  }
  else {
    console.log("Wrong Answer");
    return `
      <div class="wrong-answer">
        <p>Sorry! That was the wrong answer.</p>
        <p>The correct answer is ${STORE.questions[index].correctAnswer}</p>
      </div>
    `;
  }
}
  
// generates HTML for current question
function generateQuestion() {
    console.log("Generating Question");
    return `
      <div class="questionsAndAnswers">
        <form class="question-form">
          <fieldset>
            <legend>
              <h3>Question: ${(STORE.currentQuestion)+1} / ${STORE.questions.length}</h3>
              <h3>Current Score: ${STORE.score} / ${STORE.questions.length}</h3>
            </legend>
            <div class="question">
              <img src="${STORE.questions[STORE.currentQuestion].picture}">
              <h2>${STORE.questions[STORE.currentQuestion].question}</h2>
            </div>
            <div class="answer-options">
              <ul>
                  ${generateAnswers()}
              </ul>
            </div>
            <button type="submit" id="submit-answer-btn">Submit</button>
            <button type="button" id="next-question-btn">Next</button>
          </fieldset>
        </form>
      </div>
    `;
}

// generates HTML for results page
function generateResults(){
  console.log("Generating Results");
  return `
    <div class="results-page">
      <h2>Congratulations on finishing this quiz!</h2>
      <h2>You scored ${STORE.score}/${STORE.questions.length}</h2>
      <div class="restart-quiz-button">
          <button type="button" id="restart-quiz-btn">Restart Quiz</button>
      </div>
    </div>
  `
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  console.log("Rendering Quiz");
  renderQuizHtml = "";
  if (STORE.quizStarted === false) {
    renderQuizHtml = $('main').html(generateStartPage());
  } else if (STORE.currentQuestion === 0) {
      renderQuizHtml = $('main').html(generateQuestion());
  } else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
    renderQuizHtml = $('main').html(generateQuestion());
  } else {
    renderQuizHtml = $('main').html(generateResults());
  }
  return renderQuizHtml;
}

/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)

// listen for when user clisk start-quiz-btn
function handleStartQuiz() {
  $('main').on('click', '#start-quiz-btn', event => {
    event.preventDefault();
    STORE.quizStarted = true;
    STORE.currentQuestion = 0;
    renderQuiz();

    console.log("Starting Quiz");
  });
}
  
// listen for when the user submits the question-form
function handleSubmitAnswer() {
  $('main').on('click', '#submit-answer-btn', event => {
    event.preventDefault();
    submitAnswer();
    checkAnswer();
    
    $('#submit-answer-btn').hide();
    $('#next-question-btn').show();
  });
}

// listen for when user clicks the next-question-btn
function handleNextQuestion() {
  $('main').on('click', '#next-question-btn', event => {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

// listen for when user clicks the see-results-btn
//function handleSeeResults () {
//  $('main').on('click', '#see-results-btn', event => {
//    event.preventDefault();
//    seeResults ();
//  });
//}

// listen for when user clisk the restart-quiz-btn
// only available on results page
function handleRestartQuiz() {
  $('main').on('click', '#restart-quiz-btn', event => {
    console.log("Restarting Quiz");

    STORE.quizStarted = false;
    STORE.currentQuestion = 0;
    STORE.score = 0;
    STORE.submittingAnswer = false;
    renderQuiz();
  });
}

/********** RUN QUIZ FUNCTIONS **********/

function runQuiz () {
  renderQuiz();
  generateStartPage();
  generateAnswers();
  generateQuestion();
  nextQuestion();
  submitAnswer();
  checkAnswer();
  generateResults();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestion();
  handleRestartQuiz();
}

runQuiz();