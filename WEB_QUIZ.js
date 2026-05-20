const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: 'What does HTML stand for?',
        choices: ['Hyper Text Markup Language', 'High-Level Texting Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
        correctAnswer: 'Hyper Text Markup Language',
        answer: null
    },
    {
        id: 2,
        question: 'Which of the following is a styling language used in web development?',
        choices: ['Java', 'CSS', 'Python', 'C++'],
        correctAnswer: 'CSS',
        answer: null
    },
    {
        id: 3,
        question: 'What is the purpose of JavaScript in web development?',
        choices: ['Server-side scripting', 'Database management', 'Client-side scripting', 'Networking'],
        correctAnswer: 'Client-side scripting',
        answer: null
    },
    {
        id: 4,
        question: 'What is the role of a backend developer?',
        choices: ['Designing user interfaces', 'Ensuring responsive layouts', 'Handling server-side operations', 'Database management'],
        correctAnswer: 'Handling server-side operations',
        answer: null
    },
    {
        id: 5,
        question: 'Which programming language is commonly used for server-side scripting in web development?',
        choices: ['JavaScript', 'Java', 'Python', 'PHP'],
        correctAnswer: 'PHP',
        answer: null
    },
    {
        id: 6,
        question: 'What is the significance of responsive design in web development?',
        choices: ['Enhancing server security', 'Improving user experience across devices', 'Optimizing database performance', 'Accelerating website deployment'],
        correctAnswer: 'Improving user experience across devices',
        answer: null
    },
    {
        id: 7,
        question: 'Which front-end framework is commonly used for building user interfaces?',
        choices: ['React', 'Express', 'Django', 'Angular'],
        correctAnswer: 'React',
        answer: null
    },
    {
        id: 8,
        question: 'What is the purpose of Git in web development?',
        choices: ['Database management', 'Version control', 'Front-end styling', 'Server-side scripting'],
        correctAnswer: 'Version control',
        answer: null
    },
    {
        id: 9,
        question: 'What is the importance of user experience (UX) in web development?',
        choices: ['Ensuring server security', 'Improving website performance', 'Enhancing user satisfaction', 'Optimizing database queries'],
        correctAnswer: 'Enhancing user satisfaction',
        answer: null
    },
    {
        id: 10,
        question: 'Which recent development has significantly impacted web development?',
        choices: ['Introduction of WebAssembly (Wasm)', 'Launch of JavaScript ES7', 'Release of HTML6', 'All of the above'],
        correctAnswer: 'Introduction of WebAssembly (Wasm)',
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
