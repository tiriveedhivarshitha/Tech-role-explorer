const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: ' What is Business Intelligence (BI)?',
        choices: ['Business Integration', 'Business Information', 'Business Intelligence', 'Business Investment'],
        correctAnswer: 'Business Intelligence',
        answer: null
    },
    {
        id: 2,
        question: 'Which of the following is not a component of BI?',
        choices: ['Data Warehousing', 'Data Mining', 'Data Cleaning', 'Data Coding'],
        correctAnswer: ' Data Coding',
        answer: null
    },
    {
        id: 3,
        question: 'What is the primary purpose of a Data Warehouse in Business Intelligence?',
        choices: ['Real-time data processing', 'Storing and managing large volumes of historical data', 'Data visualization', 'Data mining'],
        correctAnswer: ' Storing and managing large volumes of historical data',
        answer: null
    },
    {
        id: 4,
        question: 'Which BI process involves analyzing data to identify patterns, trends, and insights?',
        choices: ['Data Integration', 'Data Visualization', ' Data Mining', 'Data Cleansing'],
        correctAnswer: ' Data Mining',
        answer: null
    },
    {
        id: 5,
        question: 'What does OLAP stand for in the context of Business Intelligence?',
        choices: ['Online Analytics Processing', 'Online Application Programming', ' Online Analytical Processing', 'Offline Analytical Processing'],
        correctAnswer: 'Online Analytical Processing',
        answer: null
    },
    {
        id: 6,
        question: 'What is the purpose of a BI dashboard?',
        choices: ['To store data', 'To process data', 'To visualize and monitor key performance indicators (KPIs)', ' To clean data'],
        correctAnswer: 'To visualize and monitor key performance indicators (KPIs)',
        answer: null
    },
    {
        id: 7,
        question: 'What is ETL in the context of BI?',
        choices: [' Extract, Transform, Load', 'Extract, Transfer, Load', 'Efficient Tracking and Logging', ' Enterprise Transformation Layer'],
        correctAnswer: 'Extract, Transform, Load',
        answer: null
    },
    {
        id: 8,
        question: 'Which type of analytics involves analyzing historical data to understand past performance?',
        choices: [' Descriptive Analytics', 'Predictive Analytics', ' Prescriptive Analytics', ' Diagnostic Analytics'],
        correctAnswer: ' Descriptive Analytics',
        answer: null
    },
    {
        id: 9,
        question: 'What is the role of a BI Analyst?',
        choices: ['Designing databases', 'Creating data visualizations', ' Managing network security', ' Writing code'],
        correctAnswer: 'Creating data visualizations',
        answer: null
    },
    {
        id: 10,
        question: 'Which of the following is a key challenge in BI implementation?',
        choices: ['Lack of data', 'Too much data', 'Lack of skilled personnel', 'Slow internet speed'],
        correctAnswer: 'Lack of skilled personnel',
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