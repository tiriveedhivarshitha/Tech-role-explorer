const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: 'What is Machine Learning, and how does it differ from traditional programming?',
        choices: [
            'A programming language for robots',
            'A way to teach computers to learn from data',
            'A tool for designing websites',
            'A database management system'
        ],
        correctAnswer: 'A way to teach computers to learn from data',
        answer: null
    },
    {
        id: 2,
        question: 'What is the primary goal of supervised learning in machine learning?',
        choices: [
            'Minimizing data storage',
            'Predicting outputs based on labeled training data',
            'Generating random code',
            'Creating user interfaces'
        ],
        correctAnswer: 'Predicting outputs based on labeled training data',
        answer: null
    },
    {
        id: 3,
        question: 'Which type of machine learning algorithm is used for classification tasks?',
        choices: [
            'Regression',
            'Clustering',
            'Decision Trees',
            'Reinforcement Learning'
        ],
        correctAnswer: 'Decision Trees',
        answer: null
    },
    {
        id: 4,
        question: 'What distinguishes deep learning from traditional machine learning?',
        choices: [
            'It uses deeper and more complex algorithms',
            'It requires less data',
            'It only works with structured data',
            'It doesn\'t involve neural networks'
        ],
        correctAnswer: 'It uses deeper and more complex algorithms',
        answer: null
    },
    {
        id: 5,
        question: 'What role focuses on analyzing and interpreting complex data sets in the field of Machine Learning?',
        choices: [
            'Data Analyst',
            'Software Developer',
            'Machine Learning Engineer',
            'Network Administrator'
        ],
        correctAnswer: 'Data Analyst',
        answer: null
    },
    {
        id: 6,
        question: 'What is a recommended step to start a career in Machine Learning?',
        choices: [
            'Learn a programming language',
            'Skip theoretical concepts',
            'Avoid real-world projects',
            'Ignore mathematics'
        ],
        correctAnswer: 'Learn a programming language',
        answer: null
    },
    {
        id: 7,
        question: 'Which area of Machine Learning is concerned with the interaction between computers and human language?',
        choices: [
            'Computer Vision',
            'Natural Language Processing (NLP)',
            'Reinforcement Learning',
            'Unsupervised Learning'
        ],
        correctAnswer: 'Natural Language Processing (NLP)',
        answer: null
    },
    {
        id: 8,
        question: 'In classification problems, which metric evaluates the model\'s overall performance considering both false positives and false negatives?',
        choices: [
            'Precision',
            'Recall',
            'F1 Score',
            'Accuracy'
        ],
        correctAnswer: 'F1 Score',
        answer: null
    },
    {
        id: 9,
        question: 'Why is it important to address ethical considerations in Machine Learning projects?',
        choices: [
            'To slow down project development',
            'To ensure fair and unbiased outcomes',
            'To avoid using computers',
            'To focus only on algorithms'
        ],
        correctAnswer: 'To ensure fair and unbiased outcomes',
        answer: null
    },
    {
        id: 10,
        question: 'What is transfer learning in the context of deep learning?',
        choices: [
            'Moving data from one server to another',
            'Learning from one task and applying it to another',
            'Ignoring previous knowledge',
            'Deleting machine learning models'
        ],
        correctAnswer: 'Learning from one task and applying it to another',
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
