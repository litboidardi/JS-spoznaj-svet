const startButton = document.getElementById('start-btn');
const categoriesBtns = document.getElementsByClassName('category-btn');

let categories = Array.prototype.slice.call(categoriesBtns);
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score');
let butns = document.querySelector("btn");

var score = 0;

let shuffledQuestions, currentQuestionIndex;
categories.forEach((btn) => {
    btn.addEventListener('click', function() {
        let kategoria = btn.innerText
        switch (kategoria) {
            case "Šport":
                startGame(questionsSport)
                break;
            case "Kultúra":
                startGame(questionsCulture)
                break;
            case "Rôzne":
                startGame(questionsVarious)
                break;
            case "História":
                startGame(questionsHistory)
                break;
            case "Geografia":
                startGame(questionsGeography)
                break;
            case "Veda a technika":
                startGame(questionsScience)
                break;
        }
    })
})

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(questions) {
    document.getElementsByClassName('controls')[0].style.display = 'none';
   // startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    scoreText.innerText = "Skóre: "+score;
    questionElement.innerText = question.question
    let clicked = false;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
          button.dataset.correct = answer.correct
        }
        button.addEventListener('click', (e) => {
        if(!clicked) {
            selectAnswer(e)
            clicked = true
        }          
        }, {once: true}
        );
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body) 
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct /*tu je problem, button 2x aktivuje score*/)
    })
    if(correct) {
        score=score+100;
    } else {
        score=score-100;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
   // nextButton.classList.remove('hide')
    scoreText.innerText = "Skóre: "+score;
    document.getElementsByClassName('controls')[0].style.display = 'grid';
    } else {
        startButton.innerText = 'Reštart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
 

const questionsCulture = [
    {
        question: 'Režíroval napríklad Jurský park, E. T. - Mimozemšťana či Čeluste a patrí ku komerčne najúspešnejším režisérom všetkým čias. O koho ide?',
        answers: [
            { text: 'o Roberta Zemeckisa', correct: false },
            { text: 'o Stevena Spielberga', correct: true },
            { text: 'o Olivera Stona', correct: false }
        ] 
    },
    {
        question: 'Na ktorej hore podľa Biblie pristál Noe so svojou archou po potope sveta?',
        answers: [
            { text: 'Sion', correct: false },
            { text: 'Sinaj', correct: false },
            { text: 'Ararat', correct: true } 
        ] 
    } 
]

const questionsSport = [
    {
        question: 'Akú hodnotu má vnútorná časť býčieho oka v hre šípky?',
        answers: [
            { text: '25 bodov', correct: false },
            { text: '50 bodov', correct: true },
            { text: '100 bodov', correct: false }
        ] 
    },
    {
        question: 'Medzi dve základné vzpieračské disciplíny v súčasnosti nepatrí...?',
        answers: [
            { text: 'trh', correct: false },
            { text: 'vyhod', correct: true },
            { text: 'nadhod', correct: false } 
        ] 
    } 
]

const questionsHistory = [
    {
        question: 'Jeruzalemský chrám v roku 70 zničili Rimania. Ako sa nazýva jeho posledná zachovaná časť?',
        answers: [
            { text: 'Múr utrpenia', correct: false },
            { text: 'Múr mieru', correct: false },
            { text: 'Múr nárekov', correct: true }
        ] 
    },
    {
        question: 'Čo prelomové vynašiel okolo roku 1450 Johannes Gutenberg',
        answers: [
            { text: 'tkáčske krosná', correct: false },
            { text: 'ďalekohľad', correct: false },
            { text: 'kníhtlač', correct: true } 
        ] 
    } 
]

const questionsScience = [
    {
        question: 'V ktorej vednej oblasti sa preslávil Brit Stephen Hawking (1942 - 2018)?',
        answers: [
            { text: 'v chémii', correct: false },
            { text: 'v teoretickej fyzike', correct: true },
            { text: 'vo fyziológii', correct: false }
        ] 
    },
    {
        question: 'Japonská Fukušima čelila v roku 2011 živelnej pohrome. Ktorá budova si ničivé následky zemetrasenia a potom vlny cunami odniesla najviac?',
        answers: [
            { text: 'univerzita', correct: false },
            { text: 'športový štadión', correct: false },
            { text: 'jadrová elektráreň', correct: true } 
        ] 
    } 
]

const questionsGeography = [
    {
        question: 'Ktorý štát leží na ostrove Cejlón?',
        answers: [
            { text: 'Srí Lanka', correct: true },
            { text: 'Singapur', correct: false },
            { text: 'Indonézia', correct: false }
        ] 
    },
    {
        question: 'Ktorá africká krajina je najľudnatejšia?',
        answers: [
            { text: 'Egypt', correct: false },
            { text: 'Konžská demokratická republika', correct: false },
            { text: 'Nigéria', correct: true } 
        ] 
    } 
]

const questionsVarious = [
    {
        question: 'Z ktorej krajiny pochádza strunový nástroj balalajka?',
        answers: [
            { text: 'z Ruska', correct: true },
            { text: 'z Mongolska', correct: false },
            { text: 'z Číny', correct: false }
        ] 
    },
    {
        question: 'Koľko strún majú husle?',
        answers: [
            { text: 'štyri', correct: true },
            { text: 'päť', correct: false },
            { text: 'šesť', correct: false } 
        ] 
    } 
]
