
import quizzez from "./quizzez.js"
import {updateMul2Answers , buildMul2Questions, mul2Timer, mul2Answers, mul2TimerId} from "./group2Functions.js"
import {updateFillAnswers, buildFillQuestions, fillTimerId} from "./group3Functions.js"







$("#logo").click(()=>buildMainPage())



let mul1TimerId 


function mul1Timer(){

    let i = 60*5
     mul1TimerId = setInterval(() => {
        console.log(Math.floor((i% (1000 * 60 * 60)) / (1000 * 60) * 1000) , "mins " , i % 60, 'secs' , "mul1 timer")
        $("#timer-mins").html(`${Math.floor((i% (1000 * 60 * 60)) / (1000 * 60) * 1000)}mins`)
        $("#timer-secs").html(`${i %60}secs`)
        i--
        if(i<0){
        clearInterval(mul1TimerId)
        console.log(mul1TimerId, 'jkhjgigig')
        submitMul1()
        }
    }, 1000);
    
}





export let mul1Report ={
    name: "First Group",
    correct:0,
    incorrect:0,
    totalNumberOfQuestions: 5
}

export let selectedQuiz = {}
export let currentQuestion = 0
export var totalCredit = 0
let mul1Answers = {
    q1:"",
    q2:"",
    q3:"",
    q4:"",
    q5:""
}

// export let mul2Answers = {
//     q6:[],
//     q7:[],
//     q8:[]
// }

export let fillAnswers = {
    q9:'',
    q10:''
}


export function addCredit(amount) {
    totalCredit+=amount
}

export function setCurrentQuestion(n) {
    currentQuestion = n
    
}


function getQuizzez(){
    
    let res = []
    
    quizzez.forEach(element => {
        let tmp = `
        
        <div class="col mb-4  ">
        <div class="card m-3 rndBrd gbck">
        <div class="card-body ">
        <h5 class="card-title">${element.quizTitle}</h5>
        <p class="card-text">${element.desc}</p>
        <a href="#" class="btn btn-primary quizBtn rndBrd" id="${element.quizNumber}">Take This Quiz!</a>
        </div>
        </div>
        </div>
        
        `
        
        
        
        res.push(tmp)
    })
    
    // console.log(res)
    
    return res
    
}



function buildMainPage(){
    
    $("#timer-mins").text('TIMER')
    $("#timer-secs").text('')
    
    clearInterval(mul1TimerId)
    clearInterval(mul2TimerId)
    clearInterval(fillTimerId)


    $("#main").empty()
    
    $("#main").append(`
    <h2 class="m-3">Please Choose a Quiz</h2>
    
    <div class="row row-cols-1 row-cols-md-2">
    ${getQuizzez().join('')}
    </div>
    
    `)

    $(".quizBtn").click(function (e) { 
        e.preventDefault();
    
        selectedQuiz = quizzez.find(e=>{
           return e.quizNumber == this.id
        })
    
        // console.log(selectedQuiz)
    
        buildFormPage()
    });
    
    
    
}



function ValidateId(id) 
{
 if (/^[sS]\d{9}/.test(id))
  {
    return (true)
  }
    alert("You have entered an invalid ID!")
    return (false)
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}


function buildFormPage(){
    
    $("#main").empty()
    $("#main").append(`
    <div class="center form rndBrd">
        <form>
            <div class="pt-5">

                <div class="form-group ">
                    <label >Email Address</label>
                    <input type="email" class="form-control w-60 mx-auto" id="email" aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="ID">KFUPM ID </label>
                    <input type="text" class="form-control w-60 mx-auto" id="ID" value="S">
                </div>
                
                <button type="button" class="btn btn-primary" id="idBtn">Submit</button>
            </div>
          </form >
    </div>
`)

$("#idBtn").click(e=>{

    // console.log("idBTn has been pressed")

    // if(ValidateEmail($("#email").val()) && ValidateId($("#ID").val()))
        buildQuizPage()
})
}





export function nextQuestion(){

    // checkMul1Answer()

    if(currentQuestion <= 4)
    updateMul1Answers()

    if(currentQuestion >= 5 && currentQuestion <= 7)
    updateMul2Answers()

    if(currentQuestion >= 8)
    updateFillAnswers()


    currentQuestion++
    console.log('heeeey' , currentQuestion)

    let quiz = selectedQuiz.questions[currentQuestion]
    
    if(currentQuestion < selectedQuiz.questions.length){
        
        // console.log(selectedQuiz.questions[currentQuestion].type)
        if(quiz.type == "mul"){
            buildMul1Questions(quiz)

            let choices = $(".mul")

            mul1Answers[`q${currentQuestion + 1}`]? choices[mul1Answers[`q${currentQuestion + 1}`] - 1].checked = true : ''
            
            // console.log(mul1Answers)
            // for(let i = 0 ; i< choices.length; i++) { 

            //     //  console.log(mul1Answers[`q${i + 1}`])

            //     }


        }
       else if(quiz.type == "mul2"){
            buildMul2Questions(quiz)

            // let choice = []
            let choices = $(".mul2")
            let mul2s = mul2Answers[`q${currentQuestion+1}`]
            // console.log(mul2s)

                for(let j = 0; j < mul2s.length; j++) {
                    mul2s[j]? choices[mul2s[j] - 1].checked = true : ''
                    console.log(`this is mul2Answers # ${mul2s[j]}`)


                }
                
                
                
                
                
                // console.log(choice)
                // mul2Answers[currentQuestion - 5] = choice
                
            }
                    else if(quiz.type == "fill"){
                        buildFillQuestions(quiz)

            if( fillAnswers[`q${currentQuestion + 1}`]){
                $("#answer").text('')
                $("#answer").append($(`#${fillAnswers[`q${currentQuestion + 1}`]}`))

            } 
                    }
    

    }
        else
            $("#quiz").append("<p>no more questions</p>")
        
    
}


export function previuosQuestion(){


    // checkMul1Answer()

    if(currentQuestion <= 4)
    updateMul1Answers()

    if(currentQuestion >= 5 && currentQuestion <= 7)
    updateMul2Answers()

    if(currentQuestion >= 8)
    updateFillAnswers()

    currentQuestion--
    console.log('heeeey' , currentQuestion)
    let quiz = selectedQuiz.questions[currentQuestion]

    
    // $("#quiz").empty()
    if(currentQuestion < selectedQuiz.questions.length){
        
        console.log(quiz.type)

        if(quiz.type == "mul"){        
            
            buildMul1Questions(quiz)

            let choices = $(".mul")
            mul1Answers[`q${currentQuestion + 1}`]? choices[mul1Answers[`q${currentQuestion + 1}`] - 1].checked = true : ''

        }
        else if(quiz.type == "mul2"){
            buildMul2Questions(quiz)

            let choices = $(".mul2")
            let mul2s = mul2Answers[`q${currentQuestion+1}`]
            console.log(mul2s)

                for(let j = 0; j < mul2s.length; j++) {
                    mul2s[j]? choices[mul2s[j] - 1].checked = true : ''
                    // console.log(`this is mul2Answers # ${mul2s[j]}`)
                }
        }

        else if(quiz.type == "fill"){
            // console.log('i am inside that fill condition')
            buildFillQuestions(quiz)

            if( fillAnswers[`q${currentQuestion + 1}`]){
                $("#answer").text('')
                $("#answer").append($(`#${fillAnswers[`q${currentQuestion + 1}`]}`))

            } 

        }
    

    }
        else
            $("#quiz").append("<p>no more questions</p>")
        

}


function updateMul1Answers(){

    let choice 
    let choices = $(".mul")
 for(let i = 0 ; i< choices.length; i++) { 

    choices[i].checked? choice = choices[i].value: ''

}

mul1Answers[`q${currentQuestion+1}`] = choice
// console.log(mul1Answers , "jjjjjjj")


//     console.log(mul1Answers, "all the answers")

}



function buildMul1Questions(q){

    $("#quiz").empty()
    $("#quiz").append(
     `
    <p class="card-text" >${q.text}</p>
              <div class="custom-control custom-radio m-3">
                  <input type="radio" id="customRadio1" name="customRadio" value="1" class="custom-control-input mul">
                  <label class="custom-control-label" for="customRadio1">${q.o1}</label>
              </div>
              <div class="custom-control custom-radio m-3">
                  <input type="radio" id="customRadio2" name="customRadio" value="2" class="custom-control-input mul">
                  <label class="custom-control-label" for="customRadio2">${q.o2}</label>
              </div>
              <div class="custom-control custom-radio m-3">
                  <input type="radio" id="customRadio3" name="customRadio" value="3" class="custom-control-input mul">
                  <label class="custom-control-label" for="customRadio3">${q.o3}</label>
              </div>
              <div class="custom-control custom-radio m-3">
                  <input type="radio" id="customRadio4" name="customRadio" value="4" class="custom-control-input mul">
                  <label class="custom-control-label" for="customRadio4">${q.o4}</label>
              </div>





              `
              )



              $("#even").empty()
              $(".mid").empty()

            if(currentQuestion > 0)
            $("#even").append(`<button type="button" class="btn btn-primary previuos">Previous Question</button>`)
    
            if(currentQuestion < 4)
            $("#even").append(`<button type="button" class="btn btn-primary next">Next Question</button>`)
            
            $(".mid").append(`<button type="button" class="btn btn-danger sub-mul1">Sumbit this group </button>`)

            $(".next").click(()=> nextQuestion())
            $(".previuos").click(()=> previuosQuestion())
            $(".sub-mul1").click(()=> submitMul1())



}


function buildQuizPage(){
    $("#main").empty()

  $("#main").append(`
    <div class="card center rndBrd">
    <div class="card-body">
    <h5 class="card-title">${selectedQuiz.quizTitle}</h5>
      
    <div id="quiz">
    
    
    </div>
    <div id="even">
    
    
    </div>
    
    <div class="mid">
    
    </div>
    </div>
    
    
    
    </div>
    
    
    `)
    // buildMul1Questions(quiz)
    
    buildMul1Questions(selectedQuiz.questions[currentQuestion])


    mul1Timer()
    

}








function submitMul1(){

    let questionsAnswers = {
        q1:"",
        q2:"",
        q3:"",
        q4:"",
        q5:""
    }
    let credit = 0
    
    for (let i = 0; i < 5; i++) {
        questionsAnswers[`q${i+1}`] = selectedQuiz.questions[i].correct

        if(questionsAnswers[`q${i+1}`] == mul1Answers[`q${i+1}`]){
            credit++
            mul1Report.correct++ 
        }

        else
        mul1Report.incorrect++
        
    }
    
    console.log(credit)
    totalCredit+=credit

    currentQuestion = 5
    updateMul1Answers()
    buildMul2Questions(selectedQuiz.questions[currentQuestion])

    clearInterval(mul1TimerId)
    console.log(mul1TimerId , 'the mul1 timer id')

    mul2Timer()

    console.log(mul1Report)

    // console.log(questionsAnswers , "correct ones")
    // console.log(mul1Answers , "choesen ones")

}


buildMainPage()
