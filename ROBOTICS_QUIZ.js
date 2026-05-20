const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: "What does the acronym 'ROS' stand for?",
        options: ["Robot Object System", "Robot Operating System", "Real-time Operating System", "Remote Observation System"],
        correctAnswer: "Robot Operating System",
        answer: null
    },
    {
        id: 2,
        question: "Which JavaScript library is commonly used for hardware control in robotics?",
        options: ["jQuery", "React", "Johnny-Five", "Angular"],
        correctAnswer: "Johnny-Five",
        answer: null
    },
    {
        id: 3,
        question: ' Which programming language is commonly used in ROS for developing robotic applications?',
        choices: ['Java','C#','Python','Ruby'],
        correctAnswer: 'Python',
        answer: null
    },
    {
        id: 4,
        question: 'What is the purpose of the "tf" package in ROS?',
        choices: [' To perform text formatting in ROS messages', 'b. To manage transformations between coordinate frames', ' To track time delays in communication', 'To facilitate file transfer between nodes'],
        correctAnswer: ' To manage transformations between coordinate frames',
        answer: null
    },
    {
        id: 5,
        question: 'Which ROS command is used to display a list of all running nodes in a ROS system?',
        choices: ['rosrun list', 'rosnodes', 'rosnode list', 'rosls nodes'],
        correctAnswer: 'rosnode list',
        answer: null
    },
    {
        id: 6,
        question: 'What does the term "SLAM" stand for in the context of robotics?',
        choices: ['Systematic Localization and Mapping', 'Simultaneous Localization and Mapping', ' Spatial Localization and Movement', ' Sensor-Level Autonomous Mapping'],
        correctAnswer: 'Simultaneous Localization and Mapping',
        answer: null
    },
    {
        id: 7,
        question: ' In robotics, what is the function of an "actuator"?',
        choices: ['It senses the environment', 'It processes data from sensors', 'It executes commands to produce motion or perform a task', 'It maintains communication between nodes'],
        correctAnswer: 'It executes commands to produce motion or perform a task',
        answer: null
    },
    {
        id: 8,
        question: 'Which ROS tool is commonly used for visualizing robot sensor data, robot models, and other information during development?',
        choices: [' RStudio', 'RViz', 'ROS Explorer','RoboVision'],
        correctAnswer: 'RViz',
        answer: null
    },
    {
        id: 9,
        question: 'Which ROS tool is commonly used for managing and launching ROS nodes and configurations?',
        choices: ['ROS Manager', 'ROS Control Center', 'ROS Launch', 'ROS Navigator'],
        correctAnswer: 'ROS Launch',
        answer: null
    },
    {  id: 10,
        question: ' What is the purpose of a PID controller in robotics?',
        choices: ['Pathfinding', 'Object recognition', 'Motor control', 'Vision processing'],
        correctAnswer: 'Motor control',
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