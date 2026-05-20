const questionEl = document.querySelector('.survey-question')
const surveyNumEl = document.querySelector('.survey-num')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.container')


const survey = [
    {
        id: 1,
        question: ' Identify the term which denotes that only authorized users are capable of accessing the information',
        choices: ['Integrity', 'Availability', 'Confidentiality', 'Non-repudiation'],
        correctAnswer: 'Availability',
        answer: null
    },
    {
        id: 2,
        question: ' State whether True or False: Data encryption is primarily used to ensure confidentiality.',
        choices: ['True', 'False', 'Cannot be interpreted', 'None'],
        correctAnswer: 'True',
        answer: null
    },
    {
        id: 3,
        question: 'Identify the Debian-based OS which has 2 virtual machines and focuses on preserving users’ data.',
        choices: ['Ubuntu', 'Kubuntu', 'Fedora', 'Whonix'],
        correctAnswer: 'Whonix',
        answer: null
    },
    {
        id: 4,
        question: 'Identify the oldest phone hacking technique used by hackers to make free calls.',
        choices: ['Spamming', 'Phishing', 'Phreaking', 'Cracking'],
        correctAnswer: 'All of the above',
        answer: null
    },
    {
        id: 5,
        question: 'Which of the following platforms is used for the safety and protection of information in the cloud?',
        choices: ['Cloud workload protection platforms', 'One drive', 'Cloud security protocols', 'AWS'],
        correctAnswer: 'Cloud workload protection platform',
        answer: null
    },
    {
        id: 6,
        question: 'Identify the port used to connect to Active Directory in Windows 2000.',
        choices: ['389', '445', '80', '139'],
        correctAnswer: 'All of the above',
        answer: null
    },
    {
        id: 7,
        question: 'Identify the type of attack which uses a fraudulent server with a relay address.',
        choices: ['NTLM', 'MITM', 'SMB', 'NetBIOS'],
        correctAnswer: 'MITM',
        answer: null
    },
    {
        id: 8,
        question: 'Choose among the following techniques, which are used to hide information inside a picture.',
        choices: ['Bitmapping', 'Image rendering', 'Steganography', 'Rootkits'],
        correctAnswer: 'Steganography',
        answer: null
    },
    {
        id: 9,
        question: 'Identify among the following which is used to avoid browser-based hacking.',
        choices: ['Adware remover in browser', 'Incognito mode in the browser', 'Anti-malware in browser', 'Remote browser access'],
        correctAnswer: 'Remote browser access',
        answer: null
    },
    {
        id: 10,
        question: 'EDR stands for _____',
        choices: ['Endless detection and response', 'Endpoint detection and response', 'Endless detection and recovery', 'Endpoint detection and recovery'],
        correctAnswer: 'Endpoint detection and response',
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