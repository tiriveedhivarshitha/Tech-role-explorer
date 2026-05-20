const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: 'Which cryptocurrency was the first to utilize blockchain technology?',
        choices: ['Ripple (XRP)', 'Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)'],
        correctAnswer: 'Bitcoin (BTC)',
        answer: null
    },
    {
        id: 2,
        question: 'What is a block in blockchain terminology?',
        choices: ['A group of transactions', 'A user account', 'A computer server', 'A type of cryptographic key'],
        correctAnswer: 'A group of transactions',
        answer: null
    },
    {
        id: 3,
        question: 'What consensus algorithm does Bitcoin use?',
        choices: ['Proof of Stake (PoS)', 'Delegated Proof of Stake (DPoS)', 'Proof of Work (PoW)', 'Practical Byzantine Fault Tolerance (PBFT)'],
        correctAnswer: 'Proof of Work (PoW)',
        answer: null
    },
    {
        id: 4,
        question: 'Which of the following is a key feature of blockchain?',
        choices: ['Centralized control', 'Transparency', 'Rapid scalability', 'none of the above'],
        correctAnswer: ' Transparency',
        answer: null
    },
    {
        id: 5,
        question: 'What is a smart contract in the context of blockchain?',
        choices: ['A physical contract stored on the blockchain', 'A contract signed by a computer scientist', 'A legally binding document', 'An executable code that automates contract terms'],
        correctAnswer: 'An executable code that automates contract terms',
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
        question: 'Which term is used to describe the process of validating transactions and adding them to the blockchain?',
        choices: [' Mining', 'Sharding', 'Fingerprinting', 'Indexing'],
        correctAnswer: ' Mining',
        answer: null
    },
    {
        id: 8,
        question: 'Which blockchain feature ensures that once data is recorded, it cannot be easily altered?',
        choices: ['Flexibility', 'Volatility', 'Immutability', 'Redundancy'],
        correctAnswer: 'Immutability',
        answer: null
    },
    {
        id: 9,
        question: 'Which blockchain is known for its focus on enabling smart contracts and decentralized applications (DApps)?',
        choices: ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin'],
        correctAnswer: 'Ethereum',
        answer: null
    },
    {
        id: 10,
        question: 'Which term refers to the process of distributing a blockchain across multiple network nodes?',
        choices: ['Centralization', 'Sharding', 'Partitioning', 'Clustering'],
        correctAnswer: 'Sharding',
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