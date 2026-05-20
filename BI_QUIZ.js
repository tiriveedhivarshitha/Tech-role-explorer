const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: ' What is the primary characteristic of Big Data?',
        choices: [' Small Volume', 'Large Volume', 'Medium Volume', 'Variable Volume'],
        correctAnswer: 'Large Volume',
        answer: null
    },
    {
        id: 2,
        question: 'Which of the following is NOT one of the Vs of Big Data? ',
        choices: ['Volume', 'elocity', ' Variety', 'Validation'],
        correctAnswer: ' Validation',
        answer: null
    },
    {
        id: 3,
        question: 'What is the term used to describe the ability to process data quickly in Big Data systems?',
        choices: [' Velocity', 'Volume', 'Variety', 'Value'],
        correctAnswer: ' Velocity ',
        answer: null
    },
    {
        id: 4,
        question: 'Which programming model is commonly used for processing and generating large datasets in Big Data?',
        choices: ['C++', 'Java', 'Python ', 'Ruby'],
        correctAnswer: 'Java ',
        answer: null
    },
    {
        id: 5,
        question: 'What is the purpose of Hadoop in the context of Big Data?',
        choices: ['Data storage', 'Data processing', 'Data visualization ', 'Data encryption'],
        correctAnswer: 'Data processing',
        answer: null
    },
    {
        id: 6,
        question: 'What does the term "MapReduce" refer to in the context of Big Data?',
        choices: ['A programming model for processing and generating large datasets', 'A database management system', ' A data visualization tool', 'A data storage format'],
        correctAnswer: 'A programming model for processing and generating large datasets',
        answer: null
    },
    {
        id: 7,
        question: 'Which technology is commonly used for real-time processing of Big Data?',
        choices: [' Hadoop ', 'Spark', ' Hive', 'Pig '],
        correctAnswer: 'Spark',
        answer: null
    },
    {
        id: 8,
        question: 'What type of data refers to unstructured and semi-structured data with varying formats?',
        choices: [' Structured Data', 'Semi-Structured Data', ' Unstructured Data', 'Raw Data '],
        correctAnswer: 'Unstructured Data ',
        answer: null
    },
    {
        id: 9,
        question: 'What is the role of Apache Kafka in Big Data architecture?',
        choices: ['Data processing', 'Data storage', ' Data streaming ', 'Data visualization '],
        correctAnswer: 'Data streaming',
        answer: null
    },
    {
        id: 10,
        question: 'What is the concept of "Data Lake" in Big Data?',
        choices: ['A large body of water for cooling data servers', 'A centralized repository for storing raw and unprocessed data', 'A type of data encryption algorithm', 'A real-time data processing technique'],
        correctAnswer: ' A centralized repository for storing raw and unprocessed data',
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