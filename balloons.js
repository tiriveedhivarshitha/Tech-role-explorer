const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: 'What does the acronym AI stand for?',
        choices: ['Artificial Intelligence', 'Automated Instruction', 'Algorithmic Inference', 'Advanced Interface'],
        correctAnswer: 'Artificial Intelligence',
        answer: null
    },
    {
        id: 2,
        question: 'Who is considered the "father of artificial intelligence"?',
        choices: ['Alan Turing', 'John McCarthy', 'Elon Musk', 'Ada Lovelace'],
        correctAnswer: 'John McCarthy',
        answer: null
    },
    {
        id: 3,
        question: 'What are some key career opportunities in Artificial Intelligence?',
        choices: ['AI Researcher', 'Data Scientist', 'AI Engineer', 'All of the above'],
        correctAnswer: 'All of the above',
        answer: null
    },
    {
        id: 4,
        question: 'Which programming languages are commonly used for AI development?',
        choices: ['Python', 'Java', 'C++', 'All of the above'],
        correctAnswer: 'All of the above',
        answer: null
    },
    {
        id: 5,
        question: 'What is the significance of Explainable AI (XAI) in recent AI developments?',
        choices: ['To make AI systems more transparent and understandable', 'To speed up AI model training', 'To improve AI efficiency in gaming', 'To enhance AI hardware'],
        correctAnswer: 'To make AI systems more transparent and understandable',
        answer: null
    },
    {
        id: 6,
        question: 'What is the typical roadmap for becoming an AI professional?',
        choices: ['Learn programming languages', 'Study machine learning and deep learning', 'Gain practical experience through projects', 'All of the above'],
        correctAnswer: 'All of the above',
        answer: null
    },
    {
        id: 7,
        question: 'Which core concept of AI involves teaching machines to learn patterns and make decisions?',
        choices: ['Natural Language Processing', 'Machine Learning', 'Expert Systems', 'Robotics'],
        correctAnswer: 'Machine Learning',
        answer: null
    },
    {
        id: 8,
        question: 'What is the importance of AI ethics in the development of AI systems?',
        choices: ['To ensure fairness and avoid bias', 'To improve algorithm efficiency', 'To reduce hardware costs', 'To enhance user experience'],
        correctAnswer: 'To ensure fairness and avoid bias',
        answer: null
    },
    {
        id: 9,
        question: 'What are some recent developments in AI that have gained significant attention?',
        choices: ['Generative Adversarial Networks (GANs)', 'Transformer architectures', 'OpenAIs GPT-3', 'All of the above'],
        correctAnswer: 'All of the above',
        answer: null
    },
    {
        id: 10,
        question: 'What is the role of AI in healthcare?',
        choices: ['Medical diagnosis and imaging', 'Drug discovery', 'Personalized medicine', 'All of the above'],
        correctAnswer: 'All of the above',
        answer: null
    }
];



const surveyState = {
    currentQuestion: 1
}


const navigateButtonClick = (e) => {
    if(e.target.id == 'next') {
        surveyState.currentQuestion++
        initialSurvey()
    }

    if(e.target.id == 'prev') {
        surveyState.currentQuestion--
        initialSurvey()
    }
}

const checkBoxHandler = (e, question) => {    
    //Check if the chekbox has selected before if it is remove selected
    if(!e.target.checked) {
        e.target.checked = false
        question.answer = null
        return
    }
    
    const allCheckBoxes = choicesEl.querySelectorAll('input')
    allCheckBoxes.forEach(checkBox => checkBox.checked = false)
    e.target.checked = true
    question.answer = e.target.value    
}

const getResults = () => {
    const correctAnswerCount = survey.filter(question => question.answer == question.correctAnswer).length
    const emptyQuestionCount = survey.filter(question => question.answer === null).length
    const wrongQuestionCount = survey.filter(question => question.answer !== null && question.answer != question.correctAnswer).length


    return {
        correct: correctAnswerCount,
        empty: emptyQuestionCount,
        wrong: wrongQuestionCount
    }
}


const renderQuestion = (question) => {    
    //Last question of survey
    const lastQuestion = survey[survey.length - 1]
   // Check if all questions are answered, then insert some message
   if (surveyState.currentQuestion > lastQuestion.id) {
    const results = getResults();
    let message, className;

    if (results.correct === 10) {
        message = "Excellent! You have answered all questions correctly.";
        className = "excellent";
    } else if (results.correct >= 5) {
        message = "Good job! You have answered more than half of the questions correctly.";
        className = "good";
    } else {
        message = "Satisfactory. Keep practicing to improve.";
        className = "satisfactory";
    }
   containerEl.innerHTML = `<h1 class="test-completed ${className}">${message}</h1>
        <p class="results-info"> You have <strong>${results.correct}</strong> correct, <strong>${results.wrong}</strong> wrong, <strong>${results.empty}</strong> empty answers</p>                        
        <span class="tick"></span>`;
        return;
   }
    // Clean innerHTML before append
    surveyNumEl.innerHTML = ''
    choicesEl.innerHTML = ''
    buttonEl.innerHTML = ''
    // Render question and question id
    surveyNumEl.textContent = question.id + '-'
    questionEl.textContent = question.question
    // Render choices
    question.choices.forEach(choice => {
        const questionRowEl = document.createElement('p')
        questionRowEl.setAttribute('class','question-row')
        questionRowEl.innerHTML = `<label class="label">                                        
                                        <span class="choise">${choice}</span>
                                    </label>`
        //Create checkbox input
        const checkBoxEl = document.createElement('input')
        checkBoxEl.setAttribute('type', 'checkbox')
        // Bind checkboxHandler with event and current question
        checkBoxEl.addEventListener('change', (e) => checkBoxHandler(e, question))
        //Add answer to the input as a value
        checkBoxEl.value = choice
        //If question has answer already make it checked again
        if(question.answer === choice) {
            checkBoxEl.checked = true
        }
        //Insert into question row
        questionRowEl.firstChild.prepend(checkBoxEl)
        //Insert row to the wrapper
        choicesEl.appendChild(questionRowEl)                                    
    })

    //Next & Previous Buttons
    const prevButton = document.createElement('button')
    prevButton.classList.add('nav-button')
    prevButton.classList.add('prev')
    prevButton.id = 'prev'
    prevButton.textContent = 'Previous'
    prevButton.addEventListener('click', navigateButtonClick)

    const nextButton = document.createElement('button')
    nextButton.classList.add('nav-button')
    nextButton.classList.add('next')
    nextButton.id = 'next'
    nextButton.textContent = 'Next'
    nextButton.addEventListener('click', navigateButtonClick)



    //Display buttons according to survey current question
    if(question.id == 1){        
        buttonEl.appendChild(nextButton)
    } else if (surveyState.currentQuestion == lastQuestion) {
        buttonEl.appendChild(prevButton)
    } else {
        buttonEl.appendChild(prevButton)
        buttonEl.appendChild(nextButton)
    }   
    
}

const initialSurvey = () => {
    //Get the current question
    const currentQuestion = survey.find(question => question.id === surveyState.currentQuestion)
    // Render the currentQuestion
    renderQuestion(currentQuestion)    

}

initialSurvey()
