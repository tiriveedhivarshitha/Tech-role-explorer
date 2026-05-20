const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: 'What is DevOps and why is it important in software development?',
        choices: [
            'A software development methodology',
            'A collaboration between developers and operations',
            'A tool for building mobile apps',
            'A database management system'
        ],
        correctAnswer: 'A collaboration between developers and operations',
        answer: null
    },
    {
        id: 2,
        question: 'Explain the concept of Continuous Integration (CI) in DevOps.',
        choices: [
            'A practice of merging code changes regularly',
            'A tool for managing databases',
            'A method for designing user interfaces',
            'A process of optimizing server security'
        ],
        correctAnswer: 'A practice of merging code changes regularly',
        answer: null
    },
    {
        id: 3,
        question: 'What is the purpose of Continuous Deployment (CD) in the DevOps pipeline?',
        choices: [
            'Automatically deploying code changes to production',
            'Managing server operations',
            'Creating responsive layouts',
            'Optimizing database queries'
        ],
        correctAnswer: 'Automatically deploying code changes to production',
        answer: null
    },
    {
        id: 4,
        question: 'How does DevOps contribute to improving collaboration between development and operations teams?',
        choices: [
            'By creating a divide between teams',
            'By automating all tasks',
            'By promoting communication and shared responsibility',
            'By eliminating the need for operations teams'
        ],
        correctAnswer: 'By promoting communication and shared responsibility',
        answer: null
    },
    {
        id: 5,
        question: 'Name a popular containerization technology used in DevOps.',
        choices: [
            'Java',
            'Docker',
            'Python',
            'CSS'
        ],
        correctAnswer: 'Docker',
        answer: null
    },
    {
        id: 6,
        question: 'Explain the role of Infrastructure as Code (IaC) in DevOps.',
        choices: [
            'Managing user interfaces',
            'Automating server configurations using code',
            'Handling database operations',
            'Optimizing client-side scripting'
        ],
        correctAnswer: 'Automating server configurations using code',
        answer: null
    },
    {
        id: 7,
        question: 'What is the significance of DevSecOps in the software development lifecycle?',
        choices: [
            'Enhancing user experience',
            'Integrating security practices into DevOps processes',
            'Optimizing database performance',
            'Improving front-end styling'
        ],
        correctAnswer: 'Integrating security practices into DevOps processes',
        answer: null
    },
    {
        id: 8,
        question: 'How does DevOps contribute to faster and more reliable software delivery?',
        choices: [
            'By slowing down the development process',
            'By automating repetitive tasks',
            'By focusing only on development without testing',
            'By ignoring collaboration between teams'
        ],
        correctAnswer: 'By automating repetitive tasks',
        answer: null
    },
    {
        id: 9,
        question: 'Name a popular version control system used in DevOps for tracking code changes.',
        choices: [
            'Java',
            'CSS',
            'Git',
            'Python'
        ],
        correctAnswer: 'Git',
        answer: null
    },
    {
        id: 10,
        question: 'What are some potential career opportunities in DevOps?',
        choices: [
            'Server Administrator',
            'Database Analyst',
            'DevOps Engineer',
            'Front-end Developer'
        ],
        correctAnswer: 'DevOps Engineer',
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
