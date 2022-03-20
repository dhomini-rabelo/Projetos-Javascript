let qn = 0; // questionNumber
let points = 0
let weScoreArea = document.querySelector('.scoreArea');
let weQuestionArea = document.querySelector('.questionArea');
let weProgressBar = document.querySelector('.progress--bar');
let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let resetButton = document.querySelector('.scoreArea button');

showQuestion();
resetButton.addEventListener('click', resetQuiz);

function showQuestion(){
    if(qn < 10){
        weScoreArea.style.display = 'none';
        weQuestionArea.style.display = 'block';
        let pct = Math.floor((qn/questions.length)*100);
        weProgressBar.style.width = `${pct}%`;

        let questionObj = questions[qn];
        let weQuestion = document.querySelector('.question');
        let weOptionsArea = document.querySelector('.options');
        weQuestion.innerHTML = questionObj.question;

        let createOption = (option, index) => `<div class="option" key=${index}><span>${alphabet[index].toUpperCase()}</span>${option}</div>`;   
        let options = questionObj.options.map(createOption);
        let optionsHtml = options.reduce((state, next) => state + next, '');
        weOptionsArea.innerHTML = optionsHtml;

        let weOptions = document.querySelectorAll('.options .option');
        weOptions.forEach(item => {item.addEventListener('click', optionClick);});
    } else {
        finishQuiz();
    }
}

function optionClick(event){
    let answer = questions[qn].answer;
    let optionSelected = parseInt(event.target.getAttribute('key'));
    if (optionSelected == answer){
        points++;
    }
    qn++;
    showQuestion();
}

function result(score){
    if (score == 100){
        return 'Gabaritou!!!';
    }else if (score >= 85){
        return 'Parabéns!!!';
    }else if (score >= 75){
        return 'Bom';
    }else if (score >= 65){
        return 'OK';
    }else if (score >= 45){
        return 'Melhore';
    }else if (score >= 25){
        return 'Ruim';
    }else{
        return 'Péssimo';
    }
}

function resultColor(score){
    if (score >= 75){
        return 'green';
    }else if (score >= 45){
        return 'yellow';
    }else{
        return 'red';
    }
}


function finishQuiz(){
    let weScorePtc = document.querySelector('.scorePct');
    let weScoreText1 = document.querySelector('.scoreText1');
    let weScoreText2 = document.querySelector('.scoreText2');
    weProgressBar.style.width = `100%`;
    weQuestionArea.style.display = 'none';
    weScoreArea.style.display = 'block';

    let score = Math.floor((points / questions.length) * 100);
    weScorePtc.innerHTML = `${score}%`;
    weScoreText2.innerHTML = `Você respondeu ${questions.length} questões e acertou ${points}.`;
   
    weScoreText1.style.color = resultColor(score);
    weScoreText1.innerHTML = result(score);

}

function resetQuiz(){
    points = 0;
    qn = 0;
    showQuestion();
}