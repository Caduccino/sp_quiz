// Buttons and variables
const startBtn = document.querySelector(".start-btn");
const infoBox = document.querySelector(".info-box");
const continueBtn = document.querySelector(".start");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const timeCounter = document.querySelector(".timer .timer-sec");
const ResultBox = document.querySelector(".result-box-container");
const replayBtn = document.querySelector(".replay");
let randomQuestions = [];
let questionsCounter = 0;
let counter;
let timeValue = 14;
let correctAnswersSelected = 0;

// Function that ramdomize the questions
function randomizer(array, newArray) {
    for (let i = 0; i < 5; i++){
      let randomNumber = Math.floor(Math.random() * (array.length));
      let selectedQuestions = array[randomNumber];
      array.splice(randomNumber, 1);
      newArray.push(selectedQuestions);
    }
}

// If Start Quiz Button Clicked
startBtn.onclick = () =>{
    randomizer(questions, randomQuestions);
    startBtn.classList.remove("start-btn");
    startBtn.classList.add("start-btn-invisible");
    infoBox.classList.remove("invisible");
    infoBox.classList.add("visible"); 
}

// If Continue Button Clicked
continueBtn.onclick = () =>{
    infoBox.classList.remove("visible");
    infoBox.classList.add("invisible");
    quizBox.classList.remove("invisible");
    quizBox.classList.add("visible");
    showQuestions(questionsCounter);
    queCounter(questionsCounter +1);
    nextBtnText (randomQuestions, questionsCounter);
    startTimer(timeValue)
}

// Getting questions and options from array
function showQuestions(index){
    const questionText = document.querySelector(".question-text");
    let optionList = document.querySelector(".option-list");
    
    let questionTag = '<span>'+ randomQuestions[index].question +' </span>';
    let optionTag = 
        '<div class="option"><span>'+randomQuestions[index].options[0]+'</span></div>' +
        '<div class="option"><span>'+randomQuestions[index].options[1]+'</span></div>' +
        '<div class="option"><span>'+randomQuestions[index].options[2]+'</span></div>' +
        '<div class="option"><span>'+randomQuestions[index].options[3]+'</span></div>'
    ;
    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Add icons on selected answer
let tickIcon = '<div class="icon tick"><i class="far fa-check-circle"></i></i></div>';
let crossIcon = '<div class="icon cross"><i class="far fa-times-circle"></i></div>'

// See igf the answer selected by the user is correct
function optionSelected(answer){
    nextBtn.classList.remove("invisible");
    clearInterval(counter);
    let userAnswer = answer.textContent;
    let correctAnswer = randomQuestions[questionsCounter].answer;
    let optionList = document.querySelector(".option-list");
    let allOptions = optionList.children.length;
    if (userAnswer == correctAnswer){
        answer.classList.add("correct");
        answer.classList.remove("option");
        optionList.classList.add("disabled")
        answer.insertAdjacentHTML("beforeend", tickIcon);
        correctAnswersSelected ++;
    }else {
        answer.classList.add("wrong");
        answer.classList.remove("option");
        optionList.classList.add("disabled");
        for (let i = 0; i < allOptions; i++){
            if (optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute("class", ("correct"))
                answer.insertAdjacentHTML("beforeend", crossIcon);
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }
};

// If Next Question Button Clicked
function nextBtnText (array, index){
    let optionList = document.querySelector(".option-list");
    optionList.classList.remove("disabled")
    if (array.length > index +1){
        nextBtn.innerHTML = 'Next Question <i class="fas fa-chevron-circle-right"></i>';
    }else{
        nextBtn.innerHTML = 'See Results <i class="fas fa-chevron-circle-right"></i>';
    }
};

nextBtn.onclick = ()=>{
    nextBtn.classList.remove("visible")
    nextBtn.classList.add("invisible")
    timeCounter.textContent = 15;
    clearInterval(counter);
    startTimer(timeValue);
    if (questionsCounter < randomQuestions.length -1){
        questionsCounter += 1;
        showQuestions(questionsCounter);
        queCounter(questionsCounter +1);
        nextBtnText (randomQuestions, questionsCounter)
    }else {
        quizBox.classList.remove("visible"); 
        quizBox.classList.add("invisible");
        ResultBox.classList.remove("invisible");
        ResultBox.classList.add("visible");
        totalCounter(correctAnswersSelected)
    }
};

// Questions counter at Quiz section
function queCounter(index){
    const bottomQuesCounter = document.querySelector(".total-questions");
    let totalquesCountTag = '<span>'+  index + ' of ' + randomQuestions.length +' Questions</span>';
    bottomQuesCounter.innerHTML = totalquesCountTag;
};

// Function that starts timer
function startTimer(time){
    counter = setInterval(timer, 1000); 
    function timer(){
        timeCounter.textContent = time;
        time --
        if (time < 9){
            let addZero = timeCounter.textContent;
            timeCounter.textContent = '0' + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timeCounter.textContent = '00';
            let correctAnswer = randomQuestions[questionsCounter].answer;
            let optionList = document.querySelector(".option-list");
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++){
                if (optionList.children[i].textContent == correctAnswer){
                    optionList.children[i].setAttribute("class", ("correct"))
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                    optionList.classList.add("disabled");
                }
            }
            nextBtn.classList.remove("invisible");
        }
    }
};

// Function that manipulate the results section
function totalCounter(index){
    const totalCorrectCounter = document.querySelector(".score-text");
    if (index >= 0){
        totalCorrectCounter.innerHTML = '<span>Your score is '+  index + ' of ' + randomQuestions.length +' questions. Keep trying!</span>';
    }
    if (index > 1){
        totalCorrectCounter.innerHTML = "<span>Your score is "+  index + " of " + randomQuestions.length +" questions. You know something about São Paulo.</span>";
    }
    if (index > 3){
        totalCorrectCounter.innerHTML = "<span>Your score is "+  index + " of " + randomQuestions.length +" questions. I think São Paulo got another lover!!</span>";
    }
    if (index == 5){
        totalCorrectCounter.innerHTML = "<span>Damn!! Your score is "+  index + " of " + randomQuestions.length +" questions. You deserve the Key to the City!!</span>";
    }  
};
// If Replay Button Clicked
replayBtn.onclick = () =>{
    window.location.reload()
};