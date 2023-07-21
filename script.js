const questions = [
    {
        question: "How is an array initialized in language ?",
        answers: [
            { text: "int a[3]={1,2,3};", correct: true},
            { text: "int a={1,2,3};", correct: false},
            { text: "int a[]={1,2,3};", correct: false},
            { text: "int a(3)={1,2,3};", correct: false},
        ]
    },
    {
        question: "Which one of the following is not a java feature ?",
        answers: [
            { text: "Object-oriented", correct: false},
            { text: "Use of pointers", correct: true},
            { text: "Portable", correct: false},
            { text: "Dynamic and Extensible", correct: false},
        ]
    },
    {
        question: "How is the 3rd element in an array accessed based on pointer notation ?",
        answers: [
            { text: "*a+3", correct: false},
            { text: "*(a+3)", correct: true},
            { text: "*(*a+3);", correct: false},
            { text: "&(a+3)", correct: false},
        ]
    },
    {
        question: "What is the extension of java code files ?",
        answers: [
            { text: ".js", correct: false},
            { text: ".txt", correct: false},
            { text: ".class;", correct: false},
            { text: ".java;", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => { 
        const button  = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
