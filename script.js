const startBtn = document.getElementById("start-btn");
const descInfo = document.querySelector(".desc_info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")
const tryAgainBtn = document.querySelector(".tryAgain-btn")
const goHomeBtn = document.querySelector(".goHome-btn")

startBtn.onclick = () => {
    descInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    descInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    descInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active') 

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active') 
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active') 
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    headerScore();
};

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () =>{
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        // questionCounter(questionCount + 1);
        questionCounter(questionNumber);

        nextBtn.classList.remove('active')
    }else {
        showResultBox();
    }
}

const optionList = document.querySelector(".option-list");

function showQuestions(index){
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].number}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer
    let allOptions = optionList.children.length;

    if(userAnswer == correctAnswer){
        answer.classList.add("correct")
        userScore += 1;
        headerScore();
    }else{
        answer.classList.add("incorrect")

        //if answer is incorrect, automatically show the correct answer
        for(i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct')
            }
        }
    }
    
    //if user has selected, disabled all options
    for(let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled')
    }
    
    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score ${userScore} out of ${questions.length}`;

    const circularProgrss = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    console.log(progressEndValue)
    let speed = 20;

    let progress = setInterval( () => {
        progressStartValue++;

        progressValue.textContent = `${progressEndValue}%`;
        circularProgrss.style.background = `conic-gradient(darkblue ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;

        if (progressStartValue == progressEndValue){
            clearInterval(progress)
        }
    }, speed);
}